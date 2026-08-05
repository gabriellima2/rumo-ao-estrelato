import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type { PlayerSeasonStatsRepository } from '../repositories/player-season-stats-repository'
import type {
	CreatePlayerSeasonStatsDTOInput,
	GetAllPlayerSeasonStatsByPlayerIdDTOOutput,
	GetPlayerSeasonStatsBySeasonIdDTOOutput,
} from '../dtos/player-season-stats-dto'

type PlayerSeasonStatsUseCasesContextValues = {
	getPlayerSeasonStatsBySeasonId: (
		seasonId: string,
	) => Promise<GetPlayerSeasonStatsBySeasonIdDTOOutput>
	getAllPlayerSeasonStatsByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonStatsByPlayerIdDTOOutput>
	createPlayerSeasonStats: (
		input: CreatePlayerSeasonStatsDTOInput,
	) => Promise<void>
}

const PlayerSeasonStatsUseCasesContext =
	createContext<PlayerSeasonStatsUseCasesContextValues | null>(null)

export function usePlayerSeasonStatsUseCases() {
	const context = use(PlayerSeasonStatsUseCasesContext)

	if (!context) {
		throw new Error(
			'PlayerSeasonStatsUseCasesContext must be used within a PlayerSeasonStatsUseCasesProvider',
		)
	}

	return context
}

type PlayerSeasonStatsUseCasesProviderProps = PropsWithChildren<{
	playerSeasonStatsRepository: PlayerSeasonStatsRepository
}>

export function PlayerSeasonStatsUseCasesProvider({
	children,
	playerSeasonStatsRepository,
}: PlayerSeasonStatsUseCasesProviderProps) {
	async function getPlayerSeasonStatsBySeasonId(
		seasonId: string,
	): Promise<GetPlayerSeasonStatsBySeasonIdDTOOutput> {
		return playerSeasonStatsRepository.getBySeasonId(seasonId)
	}

	async function getAllPlayerSeasonStatsByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerSeasonStatsByPlayerIdDTOOutput> {
		return playerSeasonStatsRepository.getAllByPlayerId(playerId)
	}

	async function createPlayerSeasonStats(
		input: CreatePlayerSeasonStatsDTOInput,
	): Promise<void> {
		await playerSeasonStatsRepository.create(input)
	}

	return (
		<PlayerSeasonStatsUseCasesContext.Provider
			value={{
				getPlayerSeasonStatsBySeasonId,
				getAllPlayerSeasonStatsByPlayerId,
				createPlayerSeasonStats,
			}}
		>
			{children}
		</PlayerSeasonStatsUseCasesContext.Provider>
	)
}
