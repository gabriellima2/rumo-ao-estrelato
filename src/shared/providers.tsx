import type { PropsWithChildren } from 'react'
import { PlayersUseCasesProvider } from '@/domains/players/contexts/players-use-cases-context'
import { makePlayersLocalStorageRepository } from '@/domains/players/repositories/local-storage/players-local-storage-repository'

const playersRepository = makePlayersLocalStorageRepository()

export function Providers({ children }: PropsWithChildren) {
	return (
		<PlayersUseCasesProvider playersRepository={playersRepository}>
			{children}
		</PlayersUseCasesProvider>
	)
}
