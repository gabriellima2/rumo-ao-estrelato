import type { PlayersRepository } from '../players-repository'
import type {
	CreatePlayerDTOInput,
	GetAllPlayersDTOOutput,
} from '../../dtos/players-dto'

export class PlayersLocalStorageRepository implements PlayersRepository {
	private readonly storageKey = 'players'

	async create(input: CreatePlayerDTOInput): Promise<void> {
		const players = (await this.getAll()) || []
		players.push({
			id: Math.random().toString(),
			gender: input.gender,
			firstName: input.firstName,
			lastName: input.lastName,
			country: input.country,
			position: input.position,
		})
		localStorage.setItem(this.storageKey, JSON.stringify(players))
	}

	async getAll(): Promise<GetAllPlayersDTOOutput> {
		const players =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return players as GetAllPlayersDTOOutput
	}
}

export const makePlayersLocalStorageRepository =
	(): PlayersLocalStorageRepository => {
		return new PlayersLocalStorageRepository()
	}
