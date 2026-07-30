import type { PlayerSeasonsRepository } from '../player-seasons-repository'
import type {
	CreatePlayerSeasonDTOInput,
	GetAllPlayerSeasonsDTOOutput,
	GetPlayerSeasonsByPlayerIdDTOOutput,
} from '../../dtos/player-seasons-dto'

export class PlayerSeasonsLocalStorageRepository implements PlayerSeasonsRepository {
	private readonly storageKey = 'player-seasons'

	async create(input: CreatePlayerSeasonDTOInput): Promise<void> {
		const current = (await this.getAll()) || []

		current.push({
			id: Math.random().toString(),
			playerId: input.playerId,
			playerClubId: input.playerClubId,
			seasonNumber: input.seasonNumber,
			title: input.title,
			isCurrent: input.isCurrent,
		})
		localStorage.setItem(this.storageKey, JSON.stringify(current))
	}

	async getAll(): Promise<GetAllPlayerSeasonsDTOOutput> {
		const data: GetAllPlayerSeasonsDTOOutput =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data
	}

	async getByPlayerId(
		playerId: string,
	): Promise<GetPlayerSeasonsByPlayerIdDTOOutput> {
		const seasons = await this.getAll()
		const playerSeasons = seasons.filter(
			(season) => season.playerId === playerId,
		)

		return playerSeasons
	}
}

export const makePlayerSeasonsLocalStorageRepository =
	(): PlayerSeasonsLocalStorageRepository => {
		return new PlayerSeasonsLocalStorageRepository()
	}
