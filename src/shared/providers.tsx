import type { PropsWithChildren } from 'react'
import { PlayersUseCasesProvider } from '@/domains/players/contexts/players-use-cases-context'
import { makePlayersLocalStorageRepository } from '@/domains/players/repositories/local-storage/players-local-storage-repository'
import { makePlayerClubsLocalStorageRepository } from '@/domains/players/repositories/local-storage/player-clubs-local-storage-repository'
import { makePlayerSeasonsLocalStorageRepository } from '@/domains/players/repositories/local-storage/player-seasons-local-storage-repository'
import { PlayerSeasonsUseCasesProvider } from '@/domains/players/contexts/player-seasons-use-cases-context'
import { makePlayerMomentTypesLocalStorageRepository } from '@/domains/players/repositories/local-storage/player-moment-types-local-storage-repository'
import { makePlayerMomentsLocalStorageRepository } from '@/domains/players/repositories/local-storage/player-moments-local-storage-repository'
import { PlayerMomentTypesUseCasesProvider } from '@/domains/players/contexts/player-moment-types-use-cases-context'
import { PlayerMomentsUseCasesProvider } from '@/domains/players/contexts/player-moments-use-cases-context'

const playersRepository = makePlayersLocalStorageRepository()
const playerClubsRepository = makePlayerClubsLocalStorageRepository()
const playerSeasonsRepository = makePlayerSeasonsLocalStorageRepository()
const playerMomentTypesRepository = makePlayerMomentTypesLocalStorageRepository()
const playerMomentsRepository = makePlayerMomentsLocalStorageRepository()

export function Providers({ children }: PropsWithChildren) {
	return (
		<PlayersUseCasesProvider
			playersRepository={playersRepository}
			playerClubsRepository={playerClubsRepository}
			playerSeasonsRepository={playerSeasonsRepository}
		>
			<PlayerSeasonsUseCasesProvider
				playerSeasonsRepository={playerSeasonsRepository}
				playerClubsRepository={playerClubsRepository}
				playersRepository={playersRepository}
			>
				<PlayerMomentTypesUseCasesProvider
					playerMomentTypesRepository={playerMomentTypesRepository}
				>
					<PlayerMomentsUseCasesProvider
						playerMomentsRepository={playerMomentsRepository}
					>
						{children}
					</PlayerMomentsUseCasesProvider>
				</PlayerMomentTypesUseCasesProvider>
			</PlayerSeasonsUseCasesProvider>
		</PlayersUseCasesProvider>
	)
}
