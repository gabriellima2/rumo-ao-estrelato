import type { AchievementType } from '../../catalog/achievement-types'
import type { CompetitionType } from '../../catalog/competition-types'
import type { PlayerPosition } from '../../catalog/positions'
import type { CountryCode } from '@/shared/catalog/countries'
import type { PlayerCareerTitleGroup } from '../../utils/group-player-achievements'
import type { AggregatedPlayerSeasonStats } from '../../utils/aggregate-player-season-stats'

export type SeasonCore = {
	id: string
	player_id: string
	player_club_id: string
	title: string
	season_number: number
	stint_index: number
	is_current: boolean
	player_club_name: string
}

export type SeasonListItem = {
	id: string
	playerId: string
	playerClubId: string
	playerClubName: string
	title: string
	seasonNumber: number
	stintIndex: number
	isCurrent: boolean
}

export type SeasonStatsView = {
	appearances: number
	goals: number
	assists: number
	cleanSheets: number
	yellowCards: number
	redCards: number
	averageRating: number
}

export type SeasonDetailSegment = {
	seasonId: string
	stintIndex: number
	club: { id: string; name: string }
	isCurrent: boolean
	stats?: SeasonStatsView
}

export type SeasonDetail = {
	season: {
		id: string
		currentSeasonId: string
		title: string
		seasonNumber: number
		isCurrent: boolean
		playerClubName: string
	}
	player: {
		id: string
		firstName: string
		lastName: string
		position: PlayerPosition
		country: CountryCode
		countryName: string
	}
	club: {
		id: string
		name: string
	}
	segments: SeasonDetailSegment[]
}

export type CareerSummary = {
	stats: AggregatedPlayerSeasonStats
	titleGroups: PlayerCareerTitleGroup[]
}

export type SeasonStatsInput = {
	appearances: number
	goals: number
	assists: number
	cleanSheets: number
	yellowCards: number
	redCards: number
	averageRating: number
}

export type SeasonAchievementInput = {
	name: string
	achievementType: AchievementType
	competitionType?: CompetitionType | null
}

export type FinalizeSeasonInput = {
	seasonId: string
	stats: SeasonStatsInput
	achievements: SeasonAchievementInput[]
	stayedAtClub: boolean
	newClubName?: string
}

export type TransferSeasonInput = {
	seasonId: string
	stats: SeasonStatsInput
	achievements: SeasonAchievementInput[]
	newClubName: string
}
