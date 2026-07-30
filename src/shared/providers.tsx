import type { PropsWithChildren } from 'react'
import { PlayersUseCasesProvider } from '@/domains/players/contexts/players-use-cases-context'
import { makePlayersLocalStorageRepository } from '@/domains/players/repositories/local-storage/players-local-storage-repository'
import { makePlayerClubsLocalStorageRepository } from '@/domains/players/repositories/local-storage/player-clubs-local-storage-repository'
import { makePlayerSeasonsLocalStorageRepository } from '@/domains/players/repositories/local-storage/player-seasons-local-storage-repository'
import { PlayerSeasonsUseCasesProvider } from '@/domains/players/contexts/player-seasons-use-cases-context'

const playersRepository = makePlayersLocalStorageRepository()
const playerClubsRepository = makePlayerClubsLocalStorageRepository()
const playerSeasonsRepository = makePlayerSeasonsLocalStorageRepository()

export function Providers({ children }: PropsWithChildren) {
	return (
		<PlayersUseCasesProvider
			playersRepository={playersRepository}
			playerClubsRepository={playerClubsRepository}
			playerSeasonsRepository={playerSeasonsRepository}
		>
			<PlayerSeasonsUseCasesProvider
				playerSeasonsRepository={playerSeasonsRepository}
			>
				{children}
			</PlayerSeasonsUseCasesProvider>
		</PlayersUseCasesProvider>
	)
}
