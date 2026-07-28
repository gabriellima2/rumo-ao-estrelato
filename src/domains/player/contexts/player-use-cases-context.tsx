import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type { CreatePlayerDTOInput } from '../dtos/create-player-dto'
import type { GetAllPlayersDTOOutput } from '../dtos/get-all-players-dto'
import type { PlayerRepository } from '../repositories/player-repository'

type PlayerUseCasesContextValues = {
	createPlayer: (input: CreatePlayerDTOInput) => Promise<void>
	getAllPlayers: () => Promise<GetAllPlayersDTOOutput>
}

const PlayerUseCasesContext = createContext<PlayerUseCasesContextValues | null>(
	null,
)

export function usePlayerUseCases() {
	const context = use(PlayerUseCasesContext)

	if (!context) {
		throw new Error(
			'PlayerUseCasesContext must be used within a PlayerUseCasesProvider',
		)
	}

	return context
}

type PlayerUseCasesProviderProps = PropsWithChildren<{
	playerRepository: PlayerRepository
}>

export function PlayerUseCasesProvider({
	children,
	playerRepository,
}: PlayerUseCasesProviderProps) {
	async function createPlayer(input: CreatePlayerDTOInput): Promise<void> {
		await playerRepository.create({
			country: input.country,
			firstName: input.firstName,
			lastName: input.lastName,
			gender: input.gender,
			position: input.position,
		})
	}

	async function getAllPlayers(): Promise<GetAllPlayersDTOOutput> {
		const players = await playerRepository.getAll()
		return players
	}

	return (
		<PlayerUseCasesContext.Provider
			value={{
				createPlayer,
				getAllPlayers,
			}}
		>
			{children}
		</PlayerUseCasesContext.Provider>
	)
}
