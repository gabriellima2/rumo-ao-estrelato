import type {
	CreatePlayerSeasonDTOInput,
	GetAllPlayerSeasonsDTOOutput,
	GetPlayerSeasonsByPlayerIdDTOOutput,
} from '../dtos/player-seasons-dto'

export interface PlayerSeasonsRepository {
	create: (input: CreatePlayerSeasonDTOInput) => Promise<void>
	getAll: () => Promise<GetAllPlayerSeasonsDTOOutput>
	getByPlayerId: (
		playerId: string,
	) => Promise<GetPlayerSeasonsByPlayerIdDTOOutput>
}
