import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type { PlayerMomentsRepository } from '../repositories/player-moments-repository'
import type {
	CreatePlayerMomentDTOInput,
	GetPlayerMomentsBySeasonIdDTOOutput,
} from '../dtos/player-moments-dto'

type PlayerMomentsUseCasesContextValues = {
	getPlayerMomentsBySeasonId: (
		seasonId: string,
	) => Promise<GetPlayerMomentsBySeasonIdDTOOutput>
	createPlayerMoment: (input: CreatePlayerMomentDTOInput) => Promise<void>
}

const PlayerMomentsUseCasesContext =
	createContext<PlayerMomentsUseCasesContextValues | null>(null)

export function usePlayerMomentsUseCases() {
	const context = use(PlayerMomentsUseCasesContext)

	if (!context) {
		throw new Error(
			'PlayerMomentsUseCasesContext must be used within a PlayerMomentsUseCasesProvider',
		)
	}

	return context
}

type PlayerMomentsUseCasesProviderProps = PropsWithChildren<{
	playerMomentsRepository: PlayerMomentsRepository
}>

export function PlayerMomentsUseCasesProvider({
	children,
	playerMomentsRepository,
}: PlayerMomentsUseCasesProviderProps) {
	async function getPlayerMomentsBySeasonId(
		seasonId: string,
	): Promise<GetPlayerMomentsBySeasonIdDTOOutput> {
		return playerMomentsRepository.getAllBySeasonId(seasonId)
	}

	async function createPlayerMoment(
		input: CreatePlayerMomentDTOInput,
	): Promise<void> {
		await playerMomentsRepository.create(input)
	}

	return (
		<PlayerMomentsUseCasesContext.Provider
			value={{
				getPlayerMomentsBySeasonId,
				createPlayerMoment,
			}}
		>
			{children}
		</PlayerMomentsUseCasesContext.Provider>
	)
}
