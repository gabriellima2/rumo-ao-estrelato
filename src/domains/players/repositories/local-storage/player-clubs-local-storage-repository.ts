import { STORAGE_KEYS } from './@constants'
import type { PlayerClubsRepository } from '../player-clubs-repository'
import type {
	CreatePlayerClubDTOInput,
	CreatePlayerClubDTOOutput,
	GetAllPlayerClubsDTOOutput,
} from '../../dtos/player-clubs-dto'

export class PlayerClubsLocalStorageRepository implements PlayerClubsRepository {
	private readonly storageKey = STORAGE_KEYS.PLAYER_CLUBS

	async create(
		input: CreatePlayerClubDTOInput,
	): Promise<CreatePlayerClubDTOOutput> {
		const current = (await this.getAll()) || []
		const id = Math.random().toString()

		current.push({
			id,
			playerId: input.playerId,
			name: input.name,
		})
		localStorage.setItem(this.storageKey, JSON.stringify(current))

		return { id }
	}

	async getAll(): Promise<GetAllPlayerClubsDTOOutput> {
		const data: GetAllPlayerClubsDTOOutput =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data
	}
}

export const makePlayerClubsLocalStorageRepository =
	(): PlayerClubsLocalStorageRepository => {
		return new PlayerClubsLocalStorageRepository()
	}
