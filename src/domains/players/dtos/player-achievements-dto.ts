import type { AchievementType } from '../catalog/achievement-types'
import type { CompetitionType } from '../catalog/competition-types'

export type PlayerAchievementDTO = {
	id: string
	playerId: string
	playerSeasonId: string
	playerClubId: string
	name: string
	achievementType: AchievementType
	competitionType: CompetitionType | null
}

export type CreatePlayerAchievementDTOInput = {
	playerId: string
	playerSeasonId: string
	playerClubId: string
	name: string
	achievementType: AchievementType
	competitionType?: CompetitionType | null
}

export type GetPlayerAchievementsBySeasonIdDTOOutput = Array<PlayerAchievementDTO>

export type GetAllPlayerAchievementsByPlayerIdDTOOutput =
	Array<PlayerAchievementDTO>
