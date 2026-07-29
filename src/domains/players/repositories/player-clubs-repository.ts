import type {
	CreatePlayerClubDTOInput,
	CreatePlayerClubDTOOutput,
	GetAllPlayerClubsDTOOutput,
} from '../dtos/player-clubs-dto'

export interface PlayerClubsRepository {
	create: (
		input: CreatePlayerClubDTOInput,
	) => Promise<CreatePlayerClubDTOOutput>
	getAll: () => Promise<GetAllPlayerClubsDTOOutput>
}
