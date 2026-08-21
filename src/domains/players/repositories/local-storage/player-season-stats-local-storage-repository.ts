import { STORAGE_KEYS } from './@constants'
import type { PlayerSeasonStatsRepository } from '../player-season-stats-repository'
import type {
	CreatePlayerSeasonStatsDTOInput,
	GetAllPlayerSeasonStatsByPlayerIdDTOOutput,
	GetPlayerSeasonStatsBySeasonIdDTOOutput,
	PlayerSeasonStatsDTO,
} from '../../dtos/player-season-stats-dto'

type RawStoredPlayerSeasonStats = Omit<PlayerSeasonStatsDTO, 'playerClubId'> & {
	playerClubId?: string
}

type StoredSeason = {
	id: string
	playerClubId: string
}

export class PlayerSeasonStatsLocalStorageRepository
	implements PlayerSeasonStatsRepository
{
	private readonly storageKey = STORAGE_KEYS.PLAYER_SEASON_STATS
	private readonly playerSeasonsStorageKey = STORAGE_KEYS.PLAYER_SEASONS

	async create(input: CreatePlayerSeasonStatsDTOInput): Promise<void> {
		const current = await this.getStoredStats()

		current.push({
			id: Math.random().toString(),
			playerId: input.playerId,
			playerSeasonId: input.playerSeasonId,
			playerClubId: input.playerClubId,
			appearances: input.appearances,
			goals: input.goals,
			assists: input.assists,
			cleanSheets: input.cleanSheets,
			yellowCards: input.yellowCards,
			redCards: input.redCards,
			averageRating: input.averageRating,
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

	private async getStoredStats(): Promise<Array<PlayerSeasonStatsDTO>> {
		const data: Array<RawStoredPlayerSeasonStats> =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		const seasonById = this.getSeasonByIdMap()

		return data.map((item) => normalizeStoredStats(item, seasonById))
	}

	private getSeasonByIdMap(): Map<string, StoredSeason> {
		const seasons: Array<StoredSeason> =
			JSON.parse(localStorage.getItem(this.playerSeasonsStorageKey) || '[]') ||
			[]
		return new Map(seasons.map((season) => [season.id, season]))
	}
}

function normalizeStoredStats(
	item: RawStoredPlayerSeasonStats,
	seasonById: Map<string, StoredSeason>,
): PlayerSeasonStatsDTO {
	const playerClubId =
		item.playerClubId ?? seasonById.get(item.playerSeasonId)?.playerClubId

	if (!playerClubId) {
		throw new Error('Clube não encontrado para estatísticas da temporada')
	}

	return {
		...item,
		playerClubId,
	}
}

export const makePlayerSeasonStatsLocalStorageRepository =
	(): PlayerSeasonStatsLocalStorageRepository => {
		return new PlayerSeasonStatsLocalStorageRepository()
	}
