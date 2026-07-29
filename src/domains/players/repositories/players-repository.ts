import type {
	CreatePlayerDTOInput,
	CreatePlayerDTOOutput,
	GetAllPlayersDTOOutput,
} from '../dtos/players-dto'

export interface PlayersRepository {
	create: (input: CreatePlayerDTOInput) => Promise<CreatePlayerDTOOutput>
	getAll: () => Promise<GetAllPlayersDTOOutput>
}
