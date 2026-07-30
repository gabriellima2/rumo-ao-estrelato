import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type { PlayerSeasonsRepository } from '../repositories/player-seasons-repository'
import type { GetAllPlayerSeasonsByPlayerIdDTOOutput } from '../dtos/player-seasons-dto'

type PlayerSeasonsUseCasesContextValues = {
	getAllPlayerSeasonsByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput>
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
}>

export function PlayerSeasonsUseCasesProvider({
	children,
	playerSeasonsRepository,
}: PlayerSeasonsUseCasesProviderProps) {
	async function getAllPlayerSeasonsByPlayerId(
		playerId: string,
	): Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput> {
		const playerSeasons =
			await playerSeasonsRepository.getAllByPlayerId(playerId)
		return playerSeasons
	}

	return (
		<PlayerSeasonsUseCasesContext.Provider
			value={{
				getAllPlayerSeasonsByPlayerId,
			}}
		>
			{children}
		</PlayerSeasonsUseCasesContext.Provider>
	)
}
