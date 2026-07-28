import type { PlayerRepository } from '../player-repository'
import type { CreatePlayerDTOInput } from '../../dtos/create-player-dto'
import type { GetAllPlayersDTOOutput } from '../../dtos/get-all-players-dto'

export class PlayerLocalStorageRepository implements PlayerRepository {
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

export const makePlayerLocalStorageRepository =
	(): PlayerLocalStorageRepository => {
		return new PlayerLocalStorageRepository()
	}
