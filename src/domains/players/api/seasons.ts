import { aggregatePlayerSeasonStats } from '../utils/aggregate-player-season-stats'
import { groupPlayerAchievements } from '../utils/group-player-achievements'
import { getPlayerById } from './players'
import type { CountryCode } from '@/shared/catalog/countries'
import type {
	PlayerClub,
	PlayerSeasonEnriched,
	PlayerSeasonStats,
} from '../types/database'
import type {
	CareerSummary,
	FinalizeSeasonInput,
	SeasonCore,
	SeasonDetail,
	SeasonDetailSegment,
	SeasonListItem,
	SeasonStatsView,
	TransferSeasonInput,
} from './types/seasons'
import { supabase } from '@/integrations/supabase/client'

function toSeasonCore(row: PlayerSeasonEnriched): SeasonCore {
	return {
		id: row.id,
		player_id: row.player_id,
		player_club_id: row.player_club_id,
		title: row.title,
		season_number: row.season_number,
		stint_index: row.stint_index,
		is_current: row.is_current,
		player_club_name: row.player_club_name,
	}
}

function toSeasonListItem(season: SeasonCore): SeasonListItem {
	return {
		id: season.id,
		playerId: season.player_id,
		playerClubId: season.player_club_id,
		playerClubName: season.player_club_name,
		title: season.title,
		seasonNumber: season.season_number,
		stintIndex: season.stint_index,
		isCurrent: season.is_current,
	}
}

function getRepresentativeSeasons(seasons: SeasonCore[]): SeasonCore[] {
	const bySeasonNumber = new Map<number, SeasonCore[]>()

	for (const season of seasons) {
		const group = bySeasonNumber.get(season.season_number) ?? []
		group.push(season)
		bySeasonNumber.set(season.season_number, group)
	}

	const representatives: SeasonCore[] = []

	for (const group of bySeasonNumber.values()) {
		const current = group.find((s) => s.is_current)
		if (current) {
			representatives.push(current)
			continue
		}

		const latestStint = group.reduce((latest, season) =>
			season.stint_index > latest.stint_index ? season : latest,
		)
		representatives.push(latestStint)
	}

	return representatives
}

function toStatsView(stats: PlayerSeasonStats): SeasonStatsView {
	return {
		appearances: stats.appearances,
		goals: stats.goals,
		assists: stats.assists,
		cleanSheets: stats.clean_sheets,
		yellowCards: stats.yellow_cards,
		redCards: stats.red_cards,
		averageRating: stats.average_rating,
	}
}

async function getSeasonById(
	seasonId: string,
): Promise<SeasonCore | undefined> {
	const { data, error } = await supabase
		.from('player_seasons_enriched')
		.select('*')
		.eq('id', seasonId)
		.maybeSingle()

	if (error) throw error
	if (!data) return undefined

	return toSeasonCore(data)
}

async function getSeasonStatsBySeasonId(
	seasonId: string,
): Promise<PlayerSeasonStats | undefined> {
	const { data, error } = await supabase
		.from('player_season_stats')
		.select('*')
		.eq('player_season_id', seasonId)
		.maybeSingle()

	if (error) throw error
	return data ?? undefined
}

async function getClubById(clubId: string): Promise<PlayerClub | undefined> {
	const { data, error } = await supabase
		.from('player_clubs')
		.select('*')
		.eq('id', clubId)
		.maybeSingle()

	if (error) throw error
	return data ?? undefined
}

export async function listSeasonsByPlayer(
	playerId: string,
): Promise<SeasonListItem[]> {
	const { data, error } = await supabase
		.from('player_seasons_enriched')
		.select('*')
		.eq('player_id', playerId)

	if (error) throw error

	const seasons = (data ?? []).map(toSeasonCore)
	const representativeIds = new Set(
		getRepresentativeSeasons(seasons).map((s) => s.id),
	)

	return seasons
		.filter((s) => representativeIds.has(s.id))
		.sort((a, b) => a.season_number - b.season_number)
		.map(toSeasonListItem)
}

async function getSeasonSegments(seasonId: string): Promise<SeasonCore[]> {
	const season = await getSeasonById(seasonId)
	if (!season) return []

	const { data, error } = await supabase
		.from('player_seasons_enriched')
		.select('*')
		.eq('player_id', season.player_id)
		.eq('season_number', season.season_number)
		.order('stint_index')

	if (error) throw error
	return (data ?? []).map(toSeasonCore)
}

export async function getSeasonDetail(
	seasonId: string,
): Promise<SeasonDetail | undefined> {
	const season = await getSeasonById(seasonId)
	if (!season) return undefined

	const [player, segmentSeasons] = await Promise.all([
		getPlayerById(season.player_id),
		getSeasonSegments(seasonId),
	])

	if (!player) {
		return undefined
	}

	if (segmentSeasons.length === 0) return undefined

	const currentSegment =
		segmentSeasons.find((segment) => segment.is_current) ??
		segmentSeasons[segmentSeasons.length - 1]

	const [currentClub, ...segmentStatsResults] = await Promise.all([
		getClubById(currentSegment.player_club_id),
		...segmentSeasons.map((segment) => getSeasonStatsBySeasonId(segment.id)),
	])

	if (!currentClub) return undefined

	const segments: SeasonDetailSegment[] = segmentSeasons.map(
		(segment, index) => {
			const stats = segmentStatsResults[index]

			return {
				seasonId: segment.id,
				stintIndex: segment.stint_index,
				club: {
					id: segment.player_club_id,
					name: segment.player_club_name,
				},
				isCurrent: segment.is_current,
				...(stats ? { stats: toStatsView(stats) } : {}),
			}
		},
	)

	const isLogicalSeasonCurrent = segmentSeasons.some(
		(segment) => segment.is_current,
	)

	return {
		season: {
			id: season.id,
			currentSeasonId: currentSegment.id,
			title: season.title,
			seasonNumber: season.season_number,
			isCurrent: isLogicalSeasonCurrent,
			playerClubName: currentClub.name,
		},
		player: {
			id: player.id,
			firstName: player.first_name,
			lastName: player.last_name,
			position: player.position,
			country: player.country_code as CountryCode,
			countryName: player.country_name,
		},
		club: {
			id: currentClub.id,
			name: currentClub.name,
		},
		segments,
	}
}

export async function getCareerSummary(
	playerId: string,
): Promise<CareerSummary> {
	const [statsResult, achievementsResult, clubsResult] = await Promise.all([
		supabase.from('player_season_stats').select('*').eq('player_id', playerId),
		supabase.from('player_achievements').select('*').eq('player_id', playerId),
		supabase.from('player_clubs').select('*').eq('player_id', playerId),
	])

	if (statsResult.error) throw statsResult.error
	if (achievementsResult.error) throw achievementsResult.error
	if (clubsResult.error) throw clubsResult.error

	const stats = statsResult.data ?? []
	const achievements = achievementsResult.data ?? []
	const clubs = clubsResult.data ?? []

	const clubNameById = new Map(clubs.map((club) => [club.id, club.name]))

	const uniqueSeasonIds = [
		...new Set(achievements.map((achievement) => achievement.player_season_id)),
	]

	const seasons = await Promise.all(
		uniqueSeasonIds.map((id) => getSeasonById(id)),
	)

	const seasonById = new Map(
		seasons
			.filter((s) => s !== undefined)
			.map((s) => [s.id, { title: s.title, seasonNumber: s.season_number }]),
	)

	return {
		stats: aggregatePlayerSeasonStats(stats),
		titleGroups: groupPlayerAchievements(
			achievements,
			clubNameById,
			seasonById,
		),
	}
}

export async function finalizeSeason(input: FinalizeSeasonInput) {
	const { data, error } = await supabase.rpc('finalize_season', {
		p_season_id: input.seasonId,
		p_stats: input.stats,
		p_achievements: input.achievements.map((a) => ({
			name: a.name,
			achievementType: a.achievementType,
			competitionType: a.competitionType ?? null,
		})),
		p_stayed_at_club: input.stayedAtClub,
		p_new_club_name: input.newClubName ?? undefined,
	})

	if (error) throw error

	const row = data?.[0]
	if (!row) throw new Error('Falha ao finalizar temporada')

	return { newSeasonId: row.new_season_id }
}

export async function transferSeason(input: TransferSeasonInput) {
	const { data, error } = await supabase.rpc('transfer_season', {
		p_season_id: input.seasonId,
		p_stats: input.stats,
		p_achievements: input.achievements.map((a) => ({
			name: a.name,
			achievementType: a.achievementType,
			competitionType: a.competitionType ?? null,
		})),
		p_new_club_name: input.newClubName,
	})

	if (error) throw error

	const row = data?.[0]
	if (!row) throw new Error('Falha ao transferir temporada')

	return { newSeasonId: row.new_season_id }
}
