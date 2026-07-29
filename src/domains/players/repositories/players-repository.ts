import type {
	CreatePlayerDTOInput,
	GetAllPlayersDTOOutput,
} from '../dtos/players-dto'

export interface PlayersRepository {
	create: (input: CreatePlayerDTOInput) => Promise<void>
	getAll: () => Promise<GetAllPlayersDTOOutput>
}
