import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type {
	CreatePlayerDTOInput,
	GetAllPlayersDTOOutput,
} from '../dtos/players-dto'
import type { PlayersRepository } from '../repositories/players-repository'

type PlayersUseCasesContextValues = {
	createPlayer: (input: CreatePlayerDTOInput) => Promise<void>
	getAllPlayers: () => Promise<GetAllPlayersDTOOutput>
}

const PlayersUseCasesContext =
	createContext<PlayersUseCasesContextValues | null>(null)

export function usePlayersUseCases() {
	const context = use(PlayersUseCasesContext)

	if (!context) {
		throw new Error(
			'PlayersUseCasesContext must be used within a PlayersUseCasesProvider',
		)
	}

	return context
}

type PlayersUseCasesProviderProps = PropsWithChildren<{
	playersRepository: PlayersRepository
}>

export function PlayersUseCasesProvider({
	children,
	playersRepository,
}: PlayersUseCasesProviderProps) {
	async function createPlayer(input: CreatePlayerDTOInput): Promise<void> {
		await playersRepository.create({
			country: input.country,
			firstName: input.firstName,
			lastName: input.lastName,
			gender: input.gender,
			position: input.position,
		})
	}

	async function getAllPlayers(): Promise<GetAllPlayersDTOOutput> {
		const players = await playersRepository.getAll()
		return players
	}

	return (
		<PlayersUseCasesContext.Provider
			value={{
				createPlayer,
				getAllPlayers,
			}}
		>
			{children}
		</PlayersUseCasesContext.Provider>
	)
}
