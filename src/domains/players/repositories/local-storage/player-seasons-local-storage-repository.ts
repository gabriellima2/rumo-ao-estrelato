import { STORAGE_KEYS } from './@constants'
import type { PlayerSeasonsRepository } from '../player-seasons-repository'
import type {
	CreatePlayerSeasonDTOInput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetAllPlayerSeasonsDTOOutput,
} from '../../dtos/player-seasons-dto'
import type { GetAllPlayerClubsDTOOutput } from '../../dtos/player-clubs-dto'

export class PlayerSeasonsLocalStorageRepository implements PlayerSeasonsRepository {
	private readonly storageKey = STORAGE_KEYS.PLAYER_SEASONS
	private readonly playerClubsStorageKey = STORAGE_KEYS.PLAYER_CLUBS

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

	async getAllByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput> {
		const seasons = await this.getAll()
		const playerSeasons = seasons.filter((s) => s.playerId === playerId)
		const sortedPlayerSeasons = playerSeasons.sort(
			(a, b) => a.seasonNumber - b.seasonNumber,
		)

		const clubs: GetAllPlayerClubsDTOOutput =
			JSON.parse(localStorage.getItem(this.playerClubsStorageKey) || '[]') || []
		const playerClubs = clubs
			.filter((c) => c.playerId === playerId)
			.reduce(
				(acc, c) => {
					acc[c.id] = c
					return acc
				},
				{} as Record<string, GetAllPlayerClubsDTOOutput[number]>,
			)

		return sortedPlayerSeasons.map((ps) => ({
			...ps,
			playerClubName: playerClubs[ps.playerClubId]?.name || undefined,
		}))
	}
}

export const makePlayerSeasonsLocalStorageRepository =
	(): PlayerSeasonsLocalStorageRepository => {
		return new PlayerSeasonsLocalStorageRepository()
	}
