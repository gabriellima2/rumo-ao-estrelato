import { createContext, use } from 'react'
import { aggregatePlayerSeasonStats } from '../utils/aggregate-player-season-stats'
import { groupPlayerAchievements } from '../utils/group-player-achievements'
import type { PropsWithChildren } from 'react'
import type { PlayerSeasonsRepository } from '../repositories/player-seasons-repository'
import type { PlayerClubsRepository } from '../repositories/player-clubs-repository'
import type { PlayersRepository } from '../repositories/players-repository'
import type { PlayerMomentsRepository } from '../repositories/player-moments-repository'
import type { PlayerSeasonStatsRepository } from '../repositories/player-season-stats-repository'
import type { PlayerAchievementsRepository } from '../repositories/player-achievements-repository'
import type {
	FinalizePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOOutput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetPlayerCareerSummaryDTOOutput,
	GetSeasonDetailDTOOutput,
	TransferPlayerSeasonDTOInput,
	TransferPlayerSeasonDTOOutput,
} from '../dtos/player-seasons-dto'

type PlayerSeasonsUseCasesContextValues = {
	getAllPlayerSeasonsByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput>
	getSeasonDetail: (seasonId: string) => Promise<GetSeasonDetailDTOOutput>
	getPlayerCareerSummary: (
		playerId: string,
	) => Promise<GetPlayerCareerSummaryDTOOutput>
	finalizeSeason: (
		input: FinalizePlayerSeasonDTOInput,
	) => Promise<FinalizePlayerSeasonDTOOutput>
	transferSeason: (
		input: TransferPlayerSeasonDTOInput,
	) => Promise<TransferPlayerSeasonDTOOutput>
}

const PlayerSeasonsUseCasesContext =
	createContext<PlayerSeasonsUseCasesContextValues | null>(null)

export function usePlayerSeasonsUseCases() {
	const context = use(PlayerSeasonsUseCasesContext)

	if (!context) {
		throw new Error(
			'PlayerSeasonsUseCasesContext must be used within a PlayerSeasonsUseCasesProvider',
		)
	}

	return context
}

type PlayerSeasonsUseCasesProviderProps = PropsWithChildren<{
	playerSeasonsRepository: PlayerSeasonsRepository
	playerClubsRepository: PlayerClubsRepository
	playersRepository: PlayersRepository
	playerMomentsRepository: PlayerMomentsRepository
	playerSeasonStatsRepository: PlayerSeasonStatsRepository
	playerAchievementsRepository: PlayerAchievementsRepository
}>

export function PlayerSeasonsUseCasesProvider({
	children,
	playerSeasonsRepository,
	playerClubsRepository,
	playersRepository,
	playerMomentsRepository,
	playerSeasonStatsRepository,
	playerAchievementsRepository,
}: PlayerSeasonsUseCasesProviderProps) {
	async function getAllPlayerSeasonsByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput> {
		const playerSeasons =
			await playerSeasonsRepository.getAllByPlayerId(playerId)
		return playerSeasons
	}

	async function getSeasonDetail(
		seasonId: string,
	): Promise<GetSeasonDetailDTOOutput> {
		const season = await playerSeasonsRepository.getById(seasonId)
		if (!season) return undefined

		const [player, segmentSeasons] = await Promise.all([
			playersRepository.getById(season.playerId),
			playerSeasonsRepository.getSegmentsBySeasonId(seasonId),
		])

		if (!player || segmentSeasons.length === 0) return undefined

		const currentSegment =
			segmentSeasons.find((segment) => segment.isCurrent) ??
			segmentSeasons[segmentSeasons.length - 1]

		const [currentClub, ...segmentStatsResults] = await Promise.all([
			playerClubsRepository.getById(currentSegment.playerClubId),
			...segmentSeasons.map((segment) =>
				playerSeasonStatsRepository.getBySeasonId(segment.id),
			),
		])

		if (!currentClub) return undefined

		const segments = segmentSeasons.map((segment, index) => {
			const stats = segmentStatsResults[index]
			const clubName = segment.playerClubName

			if (!clubName) {
				throw new Error('Clube não encontrado')
			}

			return {
				seasonId: segment.id,
				stintIndex: segment.stintIndex,
				club: {
					id: segment.playerClubId,
					name: clubName,
				},
				isCurrent: segment.isCurrent,
				...(stats ? { stats } : {}),
			}
		})

		const isLogicalSeasonCurrent = segmentSeasons.some(
			(segment) => segment.isCurrent,
		)

		return {
			season: {
				id: season.id,
				currentSeasonId: currentSegment.id,
				title: season.title,
				seasonNumber: season.seasonNumber,
				isCurrent: isLogicalSeasonCurrent,
				playerClubName: currentClub.name,
			},
			player: {
				id: player.id,
				firstName: player.firstName,
				lastName: player.lastName,
				position: player.position,
				country: player.country,
			},
			club: {
				id: currentClub.id,
				name: currentClub.name,
			},
			segments,
		}
	}

	async function getPlayerCareerSummary(
		playerId: string,
	): Promise<GetPlayerCareerSummaryDTOOutput> {
		const [stats, achievements, clubs] = await Promise.all([
			playerSeasonStatsRepository.getAllByPlayerId(playerId),
			playerAchievementsRepository.getAllByPlayerId(playerId),
			playerClubsRepository.getAll(),
		])

		const playerClubs = clubs.filter((club) => club.playerId === playerId)
		const clubNameById = new Map(
			playerClubs.map((club) => [club.id, club.name]),
		)

		const uniqueSeasonIds = [
			...new Set(achievements.map((achievement) => achievement.playerSeasonId)),
		]
		const seasons = await Promise.all(
			uniqueSeasonIds.map((seasonId) =>
				playerSeasonsRepository.getById(seasonId),
			),
		)
		const seasonById = new Map(
			seasons
				.filter((season) => season !== undefined)
				.map((season) => [
					season.id,
					{ title: season.title, seasonNumber: season.seasonNumber },
				]),
		)

		return {
			stats: aggregatePlayerSeasonStats(stats),
			titleGroups: groupPlayerAchievements(
				achievements,
				clubNameById,
				seasonById,
			),
		}
	}

	async function finalizeSeason(
		input: FinalizePlayerSeasonDTOInput,
	): Promise<FinalizePlayerSeasonDTOOutput> {
		return playerSeasonsRepository.finalize(input)
	}

	async function transferSeason(
		input: TransferPlayerSeasonDTOInput,
	): Promise<TransferPlayerSeasonDTOOutput> {
		const season = await playerSeasonsRepository.getById(input.seasonId)

		if (!season) {
			throw new Error('Temporada não encontrada')
		}

		const result = await playerSeasonsRepository.transfer(input)

		await playerMomentsRepository.create({
			playerId: season.playerId,
			playerSeasonId: result.newSeasonId,
			title: `Transferência para ${input.newClubName.trim()}`,
			playerMomentTypeId: 'system-transfer',
		})

		return result
	}

	return (
		<PlayerSeasonsUseCasesContext.Provider
			value={{
				getAllPlayerSeasonsByPlayerId,
				getSeasonDetail,
				getPlayerCareerSummary,
				finalizeSeason,
				transferSeason,
			}}
		>
			{children}
		</PlayerSeasonsUseCasesContext.Provider>
	)
}
