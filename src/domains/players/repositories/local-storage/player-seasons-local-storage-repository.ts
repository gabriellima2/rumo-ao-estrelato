import { STORAGE_KEYS } from './@constants'
import type { PlayerSeasonsRepository } from '../player-seasons-repository'
import type {
	CreatePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOOutput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetAllPlayerSeasonsDTOOutput,
	GetPlayerSeasonByIdDTOOutput,
} from '../../dtos/player-seasons-dto'
import type { GetAllPlayerClubsDTOOutput } from '../../dtos/player-clubs-dto'
import type { PlayerSeasonStatsDTO } from '../../dtos/player-season-stats-dto'
import type { PlayerAchievementDTO } from '../../dtos/player-achievements-dto'
import type { CompetitionType } from '../../catalog/competition-types'

type StoredSeason = GetAllPlayerSeasonsDTOOutput[number]
type StoredClub = GetAllPlayerClubsDTOOutput[number]

export class PlayerSeasonsLocalStorageRepository implements PlayerSeasonsRepository {
	private readonly storageKey = STORAGE_KEYS.PLAYER_SEASONS
	private readonly playerClubsStorageKey = STORAGE_KEYS.PLAYER_CLUBS
	private readonly playerSeasonStatsStorageKey = STORAGE_KEYS.PLAYER_SEASON_STATS
	private readonly playerAchievementsStorageKey = STORAGE_KEYS.PLAYER_ACHIEVEMENTS

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

	async finalize(
		input: FinalizePlayerSeasonDTOInput,
	): Promise<FinalizePlayerSeasonDTOOutput> {
		const seasons = this.getStoredSeasons()
		const seasonIndex = seasons.findIndex((s) => s.id === input.seasonId)

		if (seasonIndex === -1) {
			throw new Error('Temporada não encontrada')
		}

		const season = seasons[seasonIndex]

		if (!season.isCurrent) {
			throw new Error('Esta temporada já foi finalizada')
		}

		const stats = this.getStoredStats()
		if (stats.some((item) => item.playerSeasonId === input.seasonId)) {
			throw new Error('Estatísticas já registradas para esta temporada')
		}

		if (!input.stayedAtClub && !input.newClubName?.trim()) {
			throw new Error('Nome do novo clube é obrigatório')
		}

		const clubs = this.getStoredClubs()
		let playerClubId = season.playerClubId

		if (!input.stayedAtClub) {
			const newClubId = Math.random().toString()
			clubs.push({
				id: newClubId,
				playerId: season.playerId,
				name: input.newClubName!.trim(),
			})
			playerClubId = newClubId
		}

		stats.push({
			id: Math.random().toString(),
			playerId: season.playerId,
			playerSeasonId: season.id,
			...input.stats,
		})

		const achievements = this.getStoredAchievements()
		for (const achievement of input.achievements) {
			achievements.push({
				id: Math.random().toString(),
				playerId: season.playerId,
				playerSeasonId: season.id,
				name: achievement.name,
				achievementType: achievement.achievementType,
				competitionType: achievement.competitionType ?? null,
			})
		}

		seasons[seasonIndex] = { ...season, isCurrent: false }

		const nextSeasonNumber = getSequentialSeasonNumber(seasons)
		const newSeasonId = Math.random().toString()

		seasons.push({
			id: newSeasonId,
			playerId: season.playerId,
			playerClubId,
			seasonNumber: nextSeasonNumber,
			title: `Temporada ${nextSeasonNumber}`,
			isCurrent: true,
		})

		localStorage.setItem(this.storageKey, JSON.stringify(seasons))
		localStorage.setItem(this.playerClubsStorageKey, JSON.stringify(clubs))
		localStorage.setItem(this.playerSeasonStatsStorageKey, JSON.stringify(stats))
		localStorage.setItem(
			this.playerAchievementsStorageKey,
			JSON.stringify(achievements),
		)

		return { newSeasonId }
	}

	async getAll(): Promise<GetAllPlayerSeasonsDTOOutput> {
		return this.getStoredSeasons()
	}

	async getById(id: string): Promise<GetPlayerSeasonByIdDTOOutput> {
		const seasons = await this.getAll()
		const season = seasons.find((s) => s.id === id)

		if (!season) return undefined

		const clubs = this.getStoredClubs()
		const club = clubs.find((c) => c.id === season.playerClubId)

		return {
			...season,
			playerClubName: club?.name,
		}
	}

	async getAllByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput> {
		const seasons = await this.getAll()
		const playerSeasons = seasons.filter((s) => s.playerId === playerId)
		const sortedPlayerSeasons = playerSeasons.sort(
			(a, b) => a.seasonNumber - b.seasonNumber,
		)

		const clubs = this.getStoredClubs()
		const playerClubs = clubs
			.filter((c) => c.playerId === playerId)
			.reduce(
				(acc, c) => {
					acc[c.id] = c
					return acc
				},
				{} as Record<string, StoredClub>,
			)

		return sortedPlayerSeasons.map((ps) => ({
			...ps,
			playerClubName: playerClubs[ps.playerClubId]?.name || undefined,
		}))
	}

	private getStoredSeasons(): Array<StoredSeason> {
		const data: Array<StoredSeason> =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data
	}

	private getStoredClubs(): Array<StoredClub> {
		const data: Array<StoredClub> =
			JSON.parse(localStorage.getItem(this.playerClubsStorageKey) || '[]') ||
			[]
		return data
	}

	private getStoredStats(): Array<PlayerSeasonStatsDTO> {
		const data: Array<PlayerSeasonStatsDTO> =
			JSON.parse(
				localStorage.getItem(this.playerSeasonStatsStorageKey) || '[]',
			) || []
		return data
	}

	private getStoredAchievements(): Array<PlayerAchievementDTO> {
		const data: Array<PlayerAchievementDTO> =
			JSON.parse(
				localStorage.getItem(this.playerAchievementsStorageKey) || '[]',
			) || []
		return data.map((achievement) => ({
			...achievement,
			competitionType: (achievement.competitionType ?? null) as CompetitionType | null,
		}))
	}
}

function getSequentialSeasonNumber(seasons: Array<{ seasonNumber: number }>) {
	const sortedSeasons = [...seasons].sort(
		(a, b) => a.seasonNumber - b.seasonNumber,
	)
	let expected = 1

	for (const season of sortedSeasons) {
		if (season.seasonNumber === expected) {
			expected++
		} else if (season.seasonNumber > expected) {
			break
		}
	}

	return expected
}

export const makePlayerSeasonsLocalStorageRepository =
	(): PlayerSeasonsLocalStorageRepository => {
		return new PlayerSeasonsLocalStorageRepository()
	}
