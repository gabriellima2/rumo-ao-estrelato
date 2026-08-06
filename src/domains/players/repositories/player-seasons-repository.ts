import type {
	CreatePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOOutput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetAllPlayerSeasonsDTOOutput,
	GetPlayerSeasonByIdDTOOutput,
} from '../dtos/player-seasons-dto'

export interface PlayerSeasonsRepository {
	create: (input: CreatePlayerSeasonDTOInput) => Promise<void>
	finalize: (
		input: FinalizePlayerSeasonDTOInput,
	) => Promise<FinalizePlayerSeasonDTOOutput>
	getAll: () => Promise<GetAllPlayerSeasonsDTOOutput>
	getById: (id: string) => Promise<GetPlayerSeasonByIdDTOOutput>
	getAllByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput>
}
