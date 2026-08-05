import { STORAGE_KEYS } from './@constants'
import type { PlayerSeasonStatsRepository } from '../player-season-stats-repository'
import type {
	CreatePlayerSeasonStatsDTOInput,
	GetAllPlayerSeasonStatsByPlayerIdDTOOutput,
	GetPlayerSeasonStatsBySeasonIdDTOOutput,
	PlayerSeasonStatsDTO,
} from '../../dtos/player-season-stats-dto'

type StoredPlayerSeasonStats = PlayerSeasonStatsDTO

export class PlayerSeasonStatsLocalStorageRepository
	implements PlayerSeasonStatsRepository
{
	private readonly storageKey = STORAGE_KEYS.PLAYER_SEASON_STATS

	async create(input: CreatePlayerSeasonStatsDTOInput): Promise<void> {
		const current = await this.getStoredStats()

		current.push({
			id: Math.random().toString(),
			playerId: input.playerId,
			playerSeasonId: input.playerSeasonId,
			appearances: input.appearances,
			goals: input.goals,
			assists: input.assists,
			cleanSheets: input.cleanSheets,
			yellowCards: input.yellowCards,
			redCards: input.redCards,
			averageRating: input.averageRating,
			playerOfTheMatch: input.playerOfTheMatch,
		})

		localStorage.setItem(this.storageKey, JSON.stringify(current))
	}

	async getBySeasonId(
		seasonId: string,
	): Promise<GetPlayerSeasonStatsBySeasonIdDTOOutput> {
		const stats = await this.getStoredStats()
		return stats.find((item) => item.playerSeasonId === seasonId)
	}

	async getAllByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerSeasonStatsByPlayerIdDTOOutput> {
		const stats = await this.getStoredStats()
		return stats.filter((item) => item.playerId === playerId)
	}

	private async getStoredStats(): Promise<Array<StoredPlayerSeasonStats>> {
		const data: Array<StoredPlayerSeasonStats> =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data
	}
}

export const makePlayerSeasonStatsLocalStorageRepository =
	(): PlayerSeasonStatsLocalStorageRepository => {
		return new PlayerSeasonStatsLocalStorageRepository()
	}
