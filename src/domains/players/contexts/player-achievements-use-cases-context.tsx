import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type { PlayerAchievementsRepository } from '../repositories/player-achievements-repository'
import type {
	CreatePlayerAchievementDTOInput,
	GetAllPlayerAchievementsByPlayerIdDTOOutput,
	GetPlayerAchievementsBySeasonIdDTOOutput,
} from '../dtos/player-achievements-dto'

type PlayerAchievementsUseCasesContextValues = {
	getPlayerAchievementsBySeasonId: (
		seasonId: string,
	) => Promise<GetPlayerAchievementsBySeasonIdDTOOutput>
	getAllPlayerAchievementsByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerAchievementsByPlayerIdDTOOutput>
	createPlayerAchievement: (
		input: CreatePlayerAchievementDTOInput,
	) => Promise<void>
}

const PlayerAchievementsUseCasesContext =
	createContext<PlayerAchievementsUseCasesContextValues | null>(null)

export function usePlayerAchievementsUseCases() {
	const context = use(PlayerAchievementsUseCasesContext)

	if (!context) {
		throw new Error(
			'PlayerAchievementsUseCasesContext must be used within a PlayerAchievementsUseCasesProvider',
		)
	}

	return context
}

type PlayerAchievementsUseCasesProviderProps = PropsWithChildren<{
	playerAchievementsRepository: PlayerAchievementsRepository
}>

export function PlayerAchievementsUseCasesProvider({
	children,
	playerAchievementsRepository,
}: PlayerAchievementsUseCasesProviderProps) {
	async function getPlayerAchievementsBySeasonId(
		seasonId: string,
	): Promise<GetPlayerAchievementsBySeasonIdDTOOutput> {
		return playerAchievementsRepository.getAllBySeasonId(seasonId)
	}

	async function getAllPlayerAchievementsByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerAchievementsByPlayerIdDTOOutput> {
		return playerAchievementsRepository.getAllByPlayerId(playerId)
	}

	async function createPlayerAchievement(
		input: CreatePlayerAchievementDTOInput,
	): Promise<void> {
		await playerAchievementsRepository.create(input)
	}

	return (
		<PlayerAchievementsUseCasesContext.Provider
			value={{
				getPlayerAchievementsBySeasonId,
				getAllPlayerAchievementsByPlayerId,
				createPlayerAchievement,
			}}
		>
			{children}
		</PlayerAchievementsUseCasesContext.Provider>
	)
}
