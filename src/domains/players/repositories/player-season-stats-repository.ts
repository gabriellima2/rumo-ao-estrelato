import type {
	CreatePlayerSeasonStatsDTOInput,
	GetAllPlayerSeasonStatsByPlayerIdDTOOutput,
	GetPlayerSeasonStatsBySeasonIdDTOOutput,
} from '../dtos/player-season-stats-dto'

export interface PlayerSeasonStatsRepository {
	create: (input: CreatePlayerSeasonStatsDTOInput) => Promise<void>
	getBySeasonId: (
		seasonId: string,
	) => Promise<GetPlayerSeasonStatsBySeasonIdDTOOutput>
	getAllByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonStatsByPlayerIdDTOOutput>
}
