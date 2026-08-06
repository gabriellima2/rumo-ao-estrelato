import type { CountryCode } from '@/shared/catalog/countries'
import type { AchievementType } from '../catalog/achievement-types'
import type { CompetitionType } from '../catalog/competition-types'
import type { PlayerPosition } from '../catalog/positions'

export type FinalizePlayerSeasonStatsInput = {
	appearances: number
	goals: number
	assists: number
	cleanSheets: number
	yellowCards: number
	redCards: number
	averageRating: number
}

export type FinalizePlayerSeasonAchievementInput = {
	name: string
	achievementType: AchievementType
	competitionType?: CompetitionType | null
}

export type FinalizePlayerSeasonDTOInput = {
	seasonId: string
	stats: FinalizePlayerSeasonStatsInput
	achievements: FinalizePlayerSeasonAchievementInput[]
	stayedAtClub: boolean
	newClubName?: string
}

export type FinalizePlayerSeasonDTOOutput = {
	newSeasonId: string
}

export type CreatePlayerSeasonDTOInput = {
	playerId: string
	playerClubId: string
	title: string
	seasonNumber: number
	isCurrent: boolean
}

export type GetAllPlayerSeasonsDTOOutput = Array<{
	id: string
	playerId: string
	playerClubId: string
	title: string
	seasonNumber: number
	isCurrent: boolean
}>

export type GetAllPlayerSeasonsByPlayerIdDTOOutput = Array<{
	id: string
	playerId: string
	playerClubId: string
	playerClubName: string | undefined
	title: string
	seasonNumber: number
	isCurrent: boolean
}>

export type GetPlayerSeasonByIdDTOOutput =
	| {
			id: string
			playerId: string
			playerClubId: string
			playerClubName: string | undefined
			title: string
			seasonNumber: number
			isCurrent: boolean
	  }
	| undefined

export type GetSeasonDetailDTOOutput =
	| {
			season: {
				id: string
				title: string
				seasonNumber: number
				isCurrent: boolean
				playerClubName: string | undefined
			}
			player: {
				id: string
				firstName: string
				lastName: string
				position: PlayerPosition
				country: CountryCode
			}
			club: {
				id: string
				name: string
			}
	  }
	| undefined
