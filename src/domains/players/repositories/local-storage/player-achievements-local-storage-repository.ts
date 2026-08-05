import { STORAGE_KEYS } from './@constants'
import type { PlayerAchievementsRepository } from '../player-achievements-repository'
import type {
	CreatePlayerAchievementDTOInput,
	GetAllPlayerAchievementsByPlayerIdDTOOutput,
	GetPlayerAchievementsBySeasonIdDTOOutput,
	PlayerAchievementDTO,
} from '../../dtos/player-achievements-dto'
import type { CompetitionType } from '../../catalog/competition-types'

type StoredPlayerAchievement = PlayerAchievementDTO


export class PlayerAchievementsLocalStorageRepository
	implements PlayerAchievementsRepository
{
	private readonly storageKey = STORAGE_KEYS.PLAYER_ACHIEVEMENTS

	async create(input: CreatePlayerAchievementDTOInput): Promise<void> {
		const current = await this.getStoredAchievements()

		current.push({
			id: Math.random().toString(),
			playerId: input.playerId,
			playerSeasonId: input.playerSeasonId,
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

		return achievements
			.filter((achievement) => achievement.playerSeasonId === seasonId)
			.map(normalizeAchievement)
	}

	async getAllByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerAchievementsByPlayerIdDTOOutput> {
		const achievements = await this.getStoredAchievements()

		return achievements
			.filter((achievement) => achievement.playerId === playerId)
			.map(normalizeAchievement)
	}

	private async getStoredAchievements(): Promise<Array<StoredPlayerAchievement>> {
		const data: Array<StoredPlayerAchievement> =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data
	}
}

function normalizeCompetitionType(
	competitionType?: CompetitionType | null,
): CompetitionType | null {
	return competitionType ?? null
}

function normalizeAchievement(
	achievement: StoredPlayerAchievement,
): StoredPlayerAchievement {
	return {
		...achievement,
		competitionType: normalizeCompetitionType(achievement.competitionType),
	}
}


export const makePlayerAchievementsLocalStorageRepository =
	(): PlayerAchievementsLocalStorageRepository => {
		return new PlayerAchievementsLocalStorageRepository()
	}
