import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type { PlayerMomentTypesRepository } from '../repositories/player-moment-types-repository'
import type { GetAllPlayerMomentTypesDTOOutput } from '../dtos/player-moment-types-dto'

type PlayerMomentTypesUseCasesContextValues = {
	getAllPlayerMomentTypes: () => Promise<GetAllPlayerMomentTypesDTOOutput>
}

const PlayerMomentTypesUseCasesContext =
	createContext<PlayerMomentTypesUseCasesContextValues | null>(null)

export function usePlayerMomentTypesUseCases() {
	const context = use(PlayerMomentTypesUseCasesContext)

	if (!context) {
		throw new Error(
			'PlayerMomentTypesUseCasesContext must be used within a PlayerMomentTypesUseCasesProvider',
		)
	}

	return context
}

type PlayerMomentTypesUseCasesProviderProps = PropsWithChildren<{
	playerMomentTypesRepository: PlayerMomentTypesRepository
}>

export function PlayerMomentTypesUseCasesProvider({
	children,
	playerMomentTypesRepository,
}: PlayerMomentTypesUseCasesProviderProps) {
	async function getAllPlayerMomentTypes(): Promise<GetAllPlayerMomentTypesDTOOutput> {
		return playerMomentTypesRepository.getAll()
	}

	return (
		<PlayerMomentTypesUseCasesContext.Provider
			value={{
				getAllPlayerMomentTypes,
			}}
		>
			{children}
		</PlayerMomentTypesUseCasesContext.Provider>
	)
}
