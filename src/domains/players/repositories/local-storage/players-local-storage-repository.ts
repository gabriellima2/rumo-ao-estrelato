import { STORAGE_KEYS } from './@constants'
import type { PlayersRepository } from '../players-repository'
import type {
	CreatePlayerDTOInput,
	CreatePlayerDTOOutput,
	GetAllPlayersDTOOutput,
	GetPlayerByIdDTOOutput,
} from '../../dtos/players-dto'

export class PlayersLocalStorageRepository implements PlayersRepository {
	private readonly storageKey = STORAGE_KEYS.PLAYERS

	async create(input: CreatePlayerDTOInput): Promise<CreatePlayerDTOOutput> {
		const current = (await this.getAll()) || []
		const id = Math.random().toString()

		current.push({
			id,
			gender: input.gender,
			firstName: input.firstName,
			lastName: input.lastName,
			country: input.country,
			position: input.position,
		})
		localStorage.setItem(this.storageKey, JSON.stringify(current))

		return { id }
	}

	async getAll(): Promise<GetAllPlayersDTOOutput> {
		const data: GetAllPlayersDTOOutput =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data
	}

	async getById(id: string): Promise<GetPlayerByIdDTOOutput> {
		const players = await this.getAll()
		const player = players.find((p) => p.id === id)

		return player
	}
}

export const makePlayersLocalStorageRepository =
	(): PlayersLocalStorageRepository => {
		return new PlayersLocalStorageRepository()
	}
