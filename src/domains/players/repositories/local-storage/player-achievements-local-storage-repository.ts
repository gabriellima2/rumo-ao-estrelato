import { STORAGE_KEYS } from './@constants'
import type { PlayerAchievementsRepository } from '../player-achievements-repository'
import type {
	CreatePlayerAchievementDTOInput,
	GetAllPlayerAchievementsByPlayerIdDTOOutput,
	GetPlayerAchievementsBySeasonIdDTOOutput,
	PlayerAchievementDTO,
} from '../../dtos/player-achievements-dto'
import type { CompetitionType } from '../../catalog/competition-types'

type RawStoredPlayerAchievement = Omit<PlayerAchievementDTO, 'playerClubId'> & {
	playerClubId?: string
}

type StoredSeason = {
	id: string
	playerClubId: string
}

export class PlayerAchievementsLocalStorageRepository
	implements PlayerAchievementsRepository
{
	private readonly storageKey = STORAGE_KEYS.PLAYER_ACHIEVEMENTS
	private readonly playerSeasonsStorageKey = STORAGE_KEYS.PLAYER_SEASONS

	async create(input: CreatePlayerAchievementDTOInput): Promise<void> {
		const current = await this.getStoredAchievements()

		current.push({
			id: Math.random().toString(),
			playerId: input.playerId,
			playerSeasonId: input.playerSeasonId,
			playerClubId: input.playerClubId,
			name: input.name,
			achievementType: input.achievementType,
			competitionType: normalizeCompetitionType(input.competitionType),
		})

		localStorage.setItem(this.storageKey, JSON.stringify(current))
	}

	async getAllBySeasonId(
		seasonId: string,
	): Promise<GetPlayerAchievementsBySeasonIdDTOOutput> {
		const achievements = await this.getStoredAchievements()

		return achievements.filter(
			(achievement) => achievement.playerSeasonId === seasonId,
		)
	}

	async getAllByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerAchievementsByPlayerIdDTOOutput> {
		const achievements = await this.getStoredAchievements()

		return achievements.filter((achievement) => achievement.playerId === playerId)
	}

	private async getStoredAchievements(): Promise<Array<PlayerAchievementDTO>> {
		const data: Array<RawStoredPlayerAchievement> =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		const seasonById = this.getSeasonByIdMap()

		return data.map((item) => normalizeStoredAchievement(item, seasonById))
	}

	private getSeasonByIdMap(): Map<string, StoredSeason> {
		const seasons: Array<StoredSeason> =
			JSON.parse(localStorage.getItem(this.playerSeasonsStorageKey) || '[]') ||
			[]
		return new Map(seasons.map((season) => [season.id, season]))
	}
}

function normalizeCompetitionType(
	competitionType?: CompetitionType | null,
): CompetitionType | null {
	return competitionType ?? null
}

function normalizeStoredAchievement(
	item: RawStoredPlayerAchievement,
	seasonById: Map<string, StoredSeason>,
): PlayerAchievementDTO {
	const playerClubId =
		item.playerClubId ?? seasonById.get(item.playerSeasonId)?.playerClubId

	if (!playerClubId) {
		throw new Error('Clube não encontrado para conquista da temporada')
	}

	return {
		...item,
		playerClubId,
		competitionType: normalizeCompetitionType(item.competitionType),
	}
}

export const makePlayerAchievementsLocalStorageRepository =
	(): PlayerAchievementsLocalStorageRepository => {
		return new PlayerAchievementsLocalStorageRepository()
	}
