import type {
	CreatePlayerSeasonDTOInput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetAllPlayerSeasonsDTOOutput,
	GetPlayerSeasonByIdDTOOutput,
} from '../dtos/player-seasons-dto'

export interface PlayerSeasonsRepository {
	create: (input: CreatePlayerSeasonDTOInput) => Promise<void>
	getAll: () => Promise<GetAllPlayerSeasonsDTOOutput>
	getById: (id: string) => Promise<GetPlayerSeasonByIdDTOOutput>
	getAllByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput>
}
