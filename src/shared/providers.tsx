import type { PropsWithChildren } from 'react'
import { PlayerUseCasesProvider } from '@/domains/player/contexts/player-use-cases-context'
import { makePlayerLocalStorageRepository } from '@/domains/player/repositories/local-storage/player-local-storage-repository'

const playerRepository = makePlayerLocalStorageRepository()

export function Providers({ children }: PropsWithChildren) {
	return (
		<PlayerUseCasesProvider playerRepository={playerRepository}>
			{children}
		</PlayerUseCasesProvider>
	)
}
