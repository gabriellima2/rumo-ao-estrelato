import { createContext, use } from 'react'
import type { PropsWithChildren } from 'react'
import type { PlayerSeasonsRepository } from '../repositories/player-seasons-repository'
import type { PlayerClubsRepository } from '../repositories/player-clubs-repository'
import type { PlayersRepository } from '../repositories/players-repository'
import type {
	FinalizePlayerSeasonDTOInput,
	FinalizePlayerSeasonDTOOutput,
	GetAllPlayerSeasonsByPlayerIdDTOOutput,
	GetSeasonDetailDTOOutput,
} from '../dtos/player-seasons-dto'

type PlayerSeasonsUseCasesContextValues = {
	getAllPlayerSeasonsByPlayerId: (
		playerId: string,
	) => Promise<GetAllPlayerSeasonsByPlayerIdDTOOutput>
	getSeasonDetail: (seasonId: string) => Promise<GetSeasonDetailDTOOutput>
	finalizeSeason: (
		input: FinalizePlayerSeasonDTOInput,
	) => Promise<FinalizePlayerSeasonDTOOutput>
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
}>

export function PlayerSeasonsUseCasesProvider({
	children,
	playerSeasonsRepository,
	playerClubsRepository,
	playersRepository,
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

		const [player, club] = await Promise.all([
			playersRepository.getById(season.playerId),
			playerClubsRepository.getById(season.playerClubId),
		])

		if (!player || !club) return undefined

		return {
			season: {
				id: season.id,
				title: season.title,
				seasonNumber: season.seasonNumber,
				isCurrent: season.isCurrent,
				playerClubName: season.playerClubName,
			},
			player: {
				id: player.id,
				firstName: player.firstName,
				lastName: player.lastName,
				position: player.position,
				country: player.country,
			},
			club: {
				id: club.id,
				name: club.name,
			},
		}
	}

	async function finalizeSeason(
		input: FinalizePlayerSeasonDTOInput,
	): Promise<FinalizePlayerSeasonDTOOutput> {
		return playerSeasonsRepository.finalize(input)
	}

	return (
		<PlayerSeasonsUseCasesContext.Provider
			value={{
				getAllPlayerSeasonsByPlayerId,
				getSeasonDetail,
				finalizeSeason,
			}}
		>
			{children}
		</PlayerSeasonsUseCasesContext.Provider>
	)
}
