import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { requireAuth } from '@/integrations/supabase/auth-guard'
import { PlayerCareerStatsSection } from '@/domains/players/components/player-career-stats-section'
import { PlayerCareerTitlesSection } from '@/domains/players/components/player-career-titles-section'
import { playerQueries } from '@/domains/players/queries/players'
import { seasonQueries } from '@/domains/players/queries/seasons'
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
	beforeLoad: requireAuth,
	component: RouteComponent,
})

function RouteComponent() {
	const { playerId } = Route.useParams()

	const { data: player, isLoading: isLoadingPlayer } = useQuery({
		...playerQueries.byId(playerId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	const { data: careerSummary, isLoading: isLoadingCareerSummary } = useQuery({
		...seasonQueries.careerSummary(playerId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	const { data: playerSeasons, isLoading: isLoadingPlayerSeasons } = useQuery({
		...seasonQueries.byPlayer(playerId),
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
			<div className="w-full max-w-2xl space-y-8">
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
						{isLoadingPlayer ? (
							<Skeleton className="h-6 w-40" />
						) : player ? (
							`${player.first_name} ${player.last_name}`
						) : null}
					</h1>
				</header>

				{isLoadingCareerSummary ? (
					<div className="space-y-8">
						<div className="space-y-4">
							<Skeleton className="h-7 w-48" />
							<Skeleton className="h-40" />
						</div>
						<div className="space-y-4">
							<Skeleton className="h-7 w-48" />
							<Skeleton className="h-19.5" />
							<Skeleton className="h-19.5" />
						</div>
					</div>
				) : careerSummary ? (
					<div className="flex flex-col gap-8">
						<PlayerCareerStatsSection stats={careerSummary.stats} />
						<PlayerCareerTitlesSection
							titleGroups={careerSummary.titleGroups}
						/>
					</div>
				) : null}

				<section className="space-y-4">
					<h2 className="text-xl font-semibold">Temporadas</h2>
					{isLoadingPlayerSeasons ? (
						<div className="space-y-4">
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
														'bg-accent text-accent-foreground':
															season.isCurrent,
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
				</section>
			</div>
		</main>
	)
}
