import type {
	CreatePlayerAchievementDTOInput,
	GetAllPlayerAchievementsByPlayerIdDTOOutput,
	GetPlayerAchievementsBySeasonIdDTOOutput,
} from '../dtos/player-achievements-dto'

export interface PlayerAchievementsRepository {
	create: (input: CreatePlayerAchievementDTOInput) => Promise<void>
	getAllBySeasonId: (
		seasonId: string,
	) => Promise<GetPlayerAchievementsBySeasonIdDTOOutput>
	getAllByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerAchievementsByPlayerIdDTOOutput>
}
