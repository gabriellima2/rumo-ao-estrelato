import type {
	CreatePlayerSeasonDTOInput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetAllPlayerSeasonsDTOOutput,
} from '../dtos/player-seasons-dto'

export interface PlayerSeasonsRepository {
	create: (input: CreatePlayerSeasonDTOInput) => Promise<void>
	getAll: () => Promise<GetAllPlayerSeasonsDTOOutput>
	getAllByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput>
}
