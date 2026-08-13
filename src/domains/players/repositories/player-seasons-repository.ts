import type {
	CreatePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOOutput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetAllPlayerSeasonsDTOOutput,
	GetPlayerSeasonByIdDTOOutput,
	TransferPlayerSeasonDTOInput,
	TransferPlayerSeasonDTOOutput,
} from '../dtos/player-seasons-dto'

export interface PlayerSeasonsRepository {
	create: (input: CreatePlayerSeasonDTOInput) => Promise<void>
	finalize: (
		input: FinalizePlayerSeasonDTOInput,
	) => Promise<FinalizePlayerSeasonDTOOutput>
	transfer: (
		input: TransferPlayerSeasonDTOInput,
	) => Promise<TransferPlayerSeasonDTOOutput>
	getAll: () => Promise<GetAllPlayerSeasonsDTOOutput>
	getById: (id: string) => Promise<GetPlayerSeasonByIdDTOOutput>
	getAllByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput>
	getSegmentsBySeasonId: (
		seasonId: string,
	) => Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput>
}
