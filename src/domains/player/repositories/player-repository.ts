import type { CreatePlayerDTOInput } from '../dtos/create-player-dto'
import type { GetAllPlayersDTOOutput } from '../dtos/get-all-players-dto'

export interface PlayerRepository {
	create: (input: CreatePlayerDTOInput) => Promise<void>
	getAll: () => Promise<GetAllPlayersDTOOutput>
}
