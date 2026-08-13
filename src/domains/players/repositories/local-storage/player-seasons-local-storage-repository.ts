import { STORAGE_KEYS } from './@constants'
import type { PlayerSeasonsRepository } from '../player-seasons-repository'
import type {
	CreatePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOOutput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetAllPlayerSeasonsDTOOutput,
	GetPlayerSeasonByIdDTOOutput,
	TransferPlayerSeasonDTOInput,
	TransferPlayerSeasonDTOOutput,
} from '../../dtos/player-seasons-dto'
import type { GetAllPlayerClubsDTOOutput } from '../../dtos/player-clubs-dto'
import type { PlayerSeasonStatsDTO } from '../../dtos/player-season-stats-dto'
import type { PlayerAchievementDTO } from '../../dtos/player-achievements-dto'
import type { CompetitionType } from '../../catalog/competition-types'

type StoredSeason = GetAllPlayerSeasonsDTOOutput[number]
type StoredClub = GetAllPlayerClubsDTOOutput[number]

type RawStoredSeason = Omit<StoredSeason, 'stintIndex'> & {
	stintIndex?: number
}

export class PlayerSeasonsLocalStorageRepository implements PlayerSeasonsRepository {
	private readonly storageKey = STORAGE_KEYS.PLAYER_SEASONS
	private readonly playerClubsStorageKey = STORAGE_KEYS.PLAYER_CLUBS
	private readonly playerSeasonStatsStorageKey = STORAGE_KEYS.PLAYER_SEASON_STATS
	private readonly playerAchievementsStorageKey = STORAGE_KEYS.PLAYER_ACHIEVEMENTS

	async create(input: CreatePlayerSeasonDTOInput): Promise<void> {
		const current = this.getStoredSeasons()

		current.push({
			id: Math.random().toString(),
			playerId: input.playerId,
			playerClubId: input.playerClubId,
			seasonNumber: input.seasonNumber,
			stintIndex: input.stintIndex,
			title: input.title,
			isCurrent: input.isCurrent,
		})
		localStorage.setItem(this.storageKey, JSON.stringify(current))
	}

	async finalize(
		input: FinalizePlayerSeasonDTOInput,
	): Promise<FinalizePlayerSeasonDTOOutput> {
		const seasons = this.getStoredSeasons()
		const seasonIndex = seasons.findIndex((s) => s.id === input.seasonId)

		if (seasonIndex === -1) {
			throw new Error('Temporada não encontrada')
		}

		const season = seasons[seasonIndex]

		if (!season.isCurrent) {
			throw new Error('Esta temporada já foi finalizada')
		}

		const stats = this.getStoredStats()
		if (stats.some((item) => item.playerSeasonId === input.seasonId)) {
			throw new Error('Estatísticas já registradas para esta temporada')
		}

		if (!input.stayedAtClub && !input.newClubName?.trim()) {
			throw new Error('Nome do novo clube é obrigatório')
		}

		const clubs = this.getStoredClubs()
		let playerClubId = season.playerClubId

		if (!input.stayedAtClub) {
			const newClubId = Math.random().toString()
			clubs.push({
				id: newClubId,
				playerId: season.playerId,
				name: input.newClubName!.trim(),
			})
			playerClubId = newClubId
		}

		stats.push({
			id: Math.random().toString(),
			playerId: season.playerId,
			playerSeasonId: season.id,
			...input.stats,
		})

		const achievements = this.getStoredAchievements()
		for (const achievement of input.achievements) {
			achievements.push({
				id: Math.random().toString(),
				playerId: season.playerId,
				playerSeasonId: season.id,
				name: achievement.name,
				achievementType: achievement.achievementType,
				competitionType: achievement.competitionType ?? null,
			})
		}

		seasons[seasonIndex] = { ...season, isCurrent: false }

		const nextSeasonNumber = getSequentialSeasonNumber(seasons)
		const newSeasonId = Math.random().toString()

		seasons.push({
			id: newSeasonId,
			playerId: season.playerId,
			playerClubId,
			seasonNumber: nextSeasonNumber,
			stintIndex: 1,
			title: `Temporada ${nextSeasonNumber}`,
			isCurrent: true,
		})

		localStorage.setItem(this.storageKey, JSON.stringify(seasons))
		localStorage.setItem(this.playerClubsStorageKey, JSON.stringify(clubs))
		localStorage.setItem(this.playerSeasonStatsStorageKey, JSON.stringify(stats))
		localStorage.setItem(
			this.playerAchievementsStorageKey,
			JSON.stringify(achievements),
		)

		return { newSeasonId }
	}

	async transfer(
		input: TransferPlayerSeasonDTOInput,
	): Promise<TransferPlayerSeasonDTOOutput> {
		const trimmedClubName = input.newClubName.trim()

		if (!trimmedClubName) {
			throw new Error('Nome do novo clube é obrigatório')
		}

		if (trimmedClubName.length < 2) {
			throw new Error('Mínimo de 2 caracteres')
		}

		const seasons = this.getStoredSeasons()
		const seasonIndex = seasons.findIndex((s) => s.id === input.seasonId)

		if (seasonIndex === -1) {
			throw new Error('Temporada não encontrada')
		}

		const season = seasons[seasonIndex]

		if (!season.isCurrent) {
			throw new Error('Esta temporada não pode receber transferência')
		}

		const stats = this.getStoredStats()
		if (stats.some((item) => item.playerSeasonId === input.seasonId)) {
			throw new Error('Estatísticas já registradas para esta temporada')
		}

		const sameLogicalSeason = seasons.filter(
			(s) =>
				s.playerId === season.playerId &&
				s.seasonNumber === season.seasonNumber,
		)
		const nextStintIndex =
			Math.max(...sameLogicalSeason.map((s) => s.stintIndex)) + 1

		stats.push({
			id: Math.random().toString(),
			playerId: season.playerId,
			playerSeasonId: season.id,
			...input.stats,
		})

		const achievements = this.getStoredAchievements()
		for (const achievement of input.achievements) {
			achievements.push({
				id: Math.random().toString(),
				playerId: season.playerId,
				playerSeasonId: season.id,
				name: achievement.name,
				achievementType: achievement.achievementType,
				competitionType: achievement.competitionType ?? null,
			})
		}

		const clubs = this.getStoredClubs()
		const newClubId = Math.random().toString()
		clubs.push({
			id: newClubId,
			playerId: season.playerId,
			name: trimmedClubName,
		})

		seasons[seasonIndex] = { ...season, isCurrent: false }

		const newSeasonId = Math.random().toString()
		seasons.push({
			id: newSeasonId,
			playerId: season.playerId,
			playerClubId: newClubId,
			seasonNumber: season.seasonNumber,
			stintIndex: nextStintIndex,
			title: season.title,
			isCurrent: true,
		})

		localStorage.setItem(this.storageKey, JSON.stringify(seasons))
		localStorage.setItem(this.playerClubsStorageKey, JSON.stringify(clubs))
		localStorage.setItem(this.playerSeasonStatsStorageKey, JSON.stringify(stats))
		localStorage.setItem(
			this.playerAchievementsStorageKey,
			JSON.stringify(achievements),
		)

		return { newSeasonId }
	}

	async getAll(): Promise<GetAllPlayerSeasonsDTOOutput> {
		return this.getStoredSeasons()
	}

	async getById(id: string): Promise<GetPlayerSeasonByIdDTOOutput> {
		const seasons = this.getStoredSeasons()
		const season = seasons.find((s) => s.id === id)

		if (!season) return undefined

		const clubs = this.getStoredClubs()
		const club = clubs.find((c) => c.id === season.playerClubId)

		return {
			...season,
			playerClubName: club?.name,
		}
	}

	async getSegmentsBySeasonId(
		seasonId: string,
	): Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput> {
		const seasons = this.getStoredSeasons()
		const season = seasons.find((s) => s.id === seasonId)

		if (!season) return []

		const segments = seasons
			.filter(
				(s) =>
					s.playerId === season.playerId &&
					s.seasonNumber === season.seasonNumber,
			)
			.sort((a, b) => a.stintIndex - b.stintIndex)

		const clubs = this.getStoredClubs()
		const playerClubs = clubs
			.filter((c) => c.playerId === season.playerId)
			.reduce(
				(acc, c) => {
					acc[c.id] = c
					return acc
				},
				{} as Record<string, StoredClub>,
			)

		return segments.map((ps) => ({
			...ps,
			playerClubName: playerClubs[ps.playerClubId]?.name || undefined,
		}))
	}

	async getAllByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput> {
		const seasons = this.getStoredSeasons()
		const playerSeasons = seasons.filter((s) => s.playerId === playerId)

		const clubs = this.getStoredClubs()
		const playerClubs = clubs
			.filter((c) => c.playerId === playerId)
			.reduce(
				(acc, c) => {
					acc[c.id] = c
					return acc
				},
				{} as Record<string, StoredClub>,
			)

		const representativeSeasons = getRepresentativeSeasons(playerSeasons)

		return representativeSeasons
			.sort((a, b) => a.seasonNumber - b.seasonNumber)
			.map((ps) => ({
				...ps,
				playerClubName: playerClubs[ps.playerClubId]?.name || undefined,
			}))
	}

	private getStoredSeasons(): Array<StoredSeason> {
		const data: Array<RawStoredSeason> =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data.map(normalizeSeason)
	}

	private getStoredClubs(): Array<StoredClub> {
		const data: Array<StoredClub> =
			JSON.parse(localStorage.getItem(this.playerClubsStorageKey) || '[]') ||
			[]
		return data
	}

	private getStoredStats(): Array<PlayerSeasonStatsDTO> {
		const data: Array<PlayerSeasonStatsDTO> =
			JSON.parse(
				localStorage.getItem(this.playerSeasonStatsStorageKey) || '[]',
			) || []
		return data
	}

	private getStoredAchievements(): Array<PlayerAchievementDTO> {
		const data: Array<PlayerAchievementDTO> =
			JSON.parse(
				localStorage.getItem(this.playerAchievementsStorageKey) || '[]',
			) || []
		return data.map((achievement) => ({
			...achievement,
			competitionType: (achievement.competitionType ?? null),
		}))
	}
}

function normalizeSeason(season: RawStoredSeason): StoredSeason {
	return {
		...season,
		stintIndex: season.stintIndex ?? 1,
	}
}

function getRepresentativeSeasons(seasons: Array<StoredSeason>): Array<StoredSeason> {
	const bySeasonNumber = new Map<number, Array<StoredSeason>>()

	for (const season of seasons) {
		const group = bySeasonNumber.get(season.seasonNumber) ?? []
		group.push(season)
		bySeasonNumber.set(season.seasonNumber, group)
	}

	const representatives: Array<StoredSeason> = []

	for (const group of bySeasonNumber.values()) {
		const current = group.find((s) => s.isCurrent)
		if (current) {
			representatives.push(current)
			continue
		}

		const latestStint = group.reduce((latest, season) =>
			season.stintIndex > latest.stintIndex ? season : latest,
		)
		representatives.push(latestStint)
	}

	return representatives
}

function getSequentialSeasonNumber(seasons: Array<{ seasonNumber: number }>) {
	const uniqueSeasonNumbers = [
		...new Set(seasons.map((season) => season.seasonNumber)),
	].sort((a, b) => a - b)

	let expected = 1

	for (const seasonNumber of uniqueSeasonNumbers) {
		if (seasonNumber === expected) {
			expected++
		} else if (seasonNumber > expected) {
			break
		}
	}

	return expected
}

export const makePlayerSeasonsLocalStorageRepository =
	(): PlayerSeasonsLocalStorageRepository => {
		return new PlayerSeasonsLocalStorageRepository()
	}
