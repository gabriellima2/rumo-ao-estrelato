import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { usePlayerSeasonsUseCases } from '@/domains/players/contexts/player-seasons-use-cases-context'
import { usePlayersUseCases } from '@/domains/players/contexts/players-use-cases-context'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/players/$playerId')({
	component: RouteComponent,
})

function RouteComponent() {
	const { playerId } = Route.useParams()

	const { getAllPlayerSeasonsByPlayerId } = usePlayerSeasonsUseCases()
	const { getPlayerById } = usePlayersUseCases()

	const { data: player, isLoading: isLoadingPlayer } = useQuery({
		queryKey: ['get-all-players', playerId],
		queryFn: () => getPlayerById(playerId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	const { data: playerSeasons, isLoading: isLoadingPlayerSeasons } = useQuery({
		queryKey: ['get-all-players-seasons', playerId],
		queryFn: () => getAllPlayerSeasonsByPlayerId(playerId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	if (!isLoadingPlayer && !player) {
		return (
			<main className="flex h-full flex-col items-center px-4 py-8">
				<div className="w-full max-w-2xl space-y-4">
					<header className="flex flex-row items-center gap-4">
						<Button
							title="Voltar"
							variant="outline"
							nativeButton={false}
							render={
								<Link to="/careers">
									<ArrowLeft />
								</Link>
							}
						/>
						<h1 className="text-lg font-medium">Jogador não encontrado!</h1>
					</header>
				</div>
			</main>
		)
	}

	return (
		<main className="flex h-full flex-col items-center px-4 py-8">
			<div className="w-full max-w-2xl space-y-4">
				<header className="flex flex-row items-center gap-4">
					<Button
						title="Voltar"
						variant="outline"
						nativeButton={false}
						render={
							<Link to="/careers">
								<ArrowLeft />
							</Link>
						}
					/>
					<h1 className="text-lg font-medium">
						Temporadas de{' '}
						{isLoadingPlayer ? (
							<Skeleton />
						) : player ? (
							`${player?.firstName} ${player?.lastName}`
						) : null}
					</h1>
				</header>
				{isLoadingPlayerSeasons ? (
					<div className="space-y-4">
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
					</div>
				) : playerSeasons ? (
					playerSeasons.length >= 1 ? (
						<ul className="space-y-4">
							{playerSeasons.map((season) => (
								<li key={season.id}>
									<Link
										to="/players/seasons/$seasonId"
										params={{ seasonId: season.id }}
									>
										<Card
											className={cn(
												'flex flex-row items-center justify-between gap-4',
												{
													'bg-accent text-accent-foreground': season.isCurrent,
												},
											)}
										>
											<CardHeader className="flex-1">
												<CardTitle>
													{season.title} {season.isCurrent ? '(Atual)' : ''}
												</CardTitle>
												<CardDescription>
													{season.playerClubName}
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
					) : (
						<p>Nenhuma temporada encontrada!</p>
					)
				) : null}
			</div>
		</main>
	)
}
