import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { usePlayerUseCases } from '@/domains/player/contexts/player-use-cases-context'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { getCountryByCode } from '@/shared/catalog/countries'
import { getPlayerPositionLabel } from '@/domains/player/catalog/positions'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'

export const Route = createFileRoute('/careers/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { getAllPlayers } = usePlayerUseCases()

	const { data, isLoading } = useQuery({
		queryKey: ['get-all-players'],
		queryFn: getAllPlayers,
		throwOnError: true,
	})

	return (
		<main className="flex h-full flex-col items-center px-4 py-8">
			<div className="w-full max-w-2xl space-y-4">
				<header className="flex flex-row items-center justify-between gap-2">
					<h1 className="text-lg font-medium">Minhas carreiras</h1>
					<Button
						nativeButton={false}
						render={<Link to="/careers/create">Adicionar carreira</Link>}
					/>
				</header>
				{isLoading ? (
					<div className="space-y-4">
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
					</div>
				) : data ? (
					<ul className="space-y-4">
						{data.map((player) => (
							<li key={player.id}>
								<Link to="/players/$playerId" params={{ playerId: player.id }}>
									<Card className="flex flex-row items-center justify-between gap-2">
										<CardHeader className="flex-1">
											<CardTitle>
												{player.firstName} {player.lastName}
											</CardTitle>
											<CardDescription>
												{getPlayerPositionLabel(player.position)} -{' '}
												{getCountryByCode(player.country)?.name}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ChevronRight />
										</CardContent>
									</Card>
								</Link>
							</li>
						))}
					</ul>
				) : null}
			</div>
		</main>
	)
}
