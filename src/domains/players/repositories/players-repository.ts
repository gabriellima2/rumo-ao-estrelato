import type {
	CreatePlayerDTOInput,
	CreatePlayerDTOOutput,
	GetAllPlayersDTOOutput,
	GetPlayerByIdDTOOutput,
} from '../dtos/players-dto'

export interface PlayersRepository {
	create: (input: CreatePlayerDTOInput) => Promise<CreatePlayerDTOOutput>
	getAll: () => Promise<GetAllPlayersDTOOutput>
	getById: (id: string) => Promise<GetPlayerByIdDTOOutput>
}
