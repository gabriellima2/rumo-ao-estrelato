import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type {
	CreatePlayerDTOInput,
	GetAllPlayersDTOOutput,
	GetPlayerByIdDTOOutput,
} from '../dtos/players-dto'
import type { PlayersRepository } from '../repositories/players-repository'
import type { PlayerClubsRepository } from '../repositories/player-clubs-repository'
import type { PlayerSeasonsRepository } from '../repositories/player-seasons-repository'

type CreatePlayerInput = CreatePlayerDTOInput & {
	clubName: string
}

type PlayersUseCasesContextValues = {
	createPlayer: (input: CreatePlayerInput) => Promise<void>
	getAllPlayers: () => Promise<GetAllPlayersDTOOutput>
	getPlayerById: (id: string) => Promise<GetPlayerByIdDTOOutput>
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
	playerClubsRepository: PlayerClubsRepository
	playerSeasonsRepository: PlayerSeasonsRepository
}>

export function PlayersUseCasesProvider({
	children,
	playersRepository,
	playerClubsRepository,
	playerSeasonsRepository,
}: PlayersUseCasesProviderProps) {
	function getSequentialSeasonNumber(seasons: Array<{ seasonNumber: number }>) {
		const sortedSeasons = [...new Set(seasons)].sort(
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

	async function createPlayer(input: CreatePlayerInput): Promise<void> {
		const player = await playersRepository.create({
			country: input.country,
			firstName: input.firstName,
			lastName: input.lastName,
			gender: input.gender,
			position: input.position,
		})

		const playerClub = await playerClubsRepository.create({
			playerId: player.id,
			name: input.clubName,
		})

		const playerSeasons = await playerSeasonsRepository.getAllByPlayerId(
			player.id,
		)
		const seasonNumber = getSequentialSeasonNumber(playerSeasons)

		await playerSeasonsRepository.create({
			playerId: player.id,
			playerClubId: playerClub.id,
			seasonNumber: getSequentialSeasonNumber(playerSeasons),
			title: `Temporada ${seasonNumber}`,
			isCurrent: true,
		})
	}

	async function getAllPlayers(): Promise<GetAllPlayersDTOOutput> {
		const players = await playersRepository.getAll()
		return players
	}

	async function getPlayerById(id: string): Promise<GetPlayerByIdDTOOutput> {
		const player = await playersRepository.getById(id)
		return player
	}

	return (
		<PlayersUseCasesContext.Provider
			value={{
				createPlayer,
				getAllPlayers,
				getPlayerById,
			}}
		>
			{children}
		</PlayersUseCasesContext.Provider>
	)
}
