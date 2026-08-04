import { SYSTEM_PLAYER_MOMENT_TYPES } from '../../catalog/system-player-moment-types'
import { STORAGE_KEYS } from './@constants'
import type { GetAllPlayerMomentTypesDTOOutput } from '../../dtos/player-moment-types-dto'
import type { PlayerMomentTypesRepository } from '../player-moment-types-repository'

export class PlayerMomentTypesLocalStorageRepository implements PlayerMomentTypesRepository {
	private readonly storageKey = STORAGE_KEYS.PLAYER_MOMENT_TYPES

	async seedIfEmpty(): Promise<void> {
		const existing = localStorage.getItem(this.storageKey)
		if (existing && JSON.parse(existing).length > 0) return

		localStorage.setItem(
			this.storageKey,
			JSON.stringify(SYSTEM_PLAYER_MOMENT_TYPES),
		)
	}

	async getAll(): Promise<GetAllPlayerMomentTypesDTOOutput> {
		await this.seedIfEmpty()

		const data: GetAllPlayerMomentTypesDTOOutput =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data
	}
}

export const makePlayerMomentTypesLocalStorageRepository =
	(): PlayerMomentTypesLocalStorageRepository => {
		return new PlayerMomentTypesLocalStorageRepository()
	}
