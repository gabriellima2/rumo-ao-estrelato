import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { usePlayerSeasonsUseCases } from '@/domains/players/contexts/player-seasons-use-cases-context'
import { usePlayerMomentTypesUseCases } from '@/domains/players/contexts/player-moment-types-use-cases-context'
import { usePlayerMomentsUseCases } from '@/domains/players/contexts/player-moments-use-cases-context'
import { SeasonInfoSection } from '@/domains/players/components/season-info-section'
import { SeasonMomentsSection } from '@/domains/players/components/season-moments-section'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'

export const Route = createFileRoute('/players/seasons/$seasonId/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { seasonId } = Route.useParams()

	const { getSeasonDetail } = usePlayerSeasonsUseCases()
	const { getAllPlayerMomentTypes } = usePlayerMomentTypesUseCases()
	const { getPlayerMomentsBySeasonId } = usePlayerMomentsUseCases()

	const { data: seasonDetail, isLoading: isLoadingSeasonDetail } = useQuery({
		queryKey: ['season-detail', seasonId],
		queryFn: () => getSeasonDetail(seasonId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	const { data: momentTypes, isLoading: isLoadingMomentTypes } = useQuery({
		queryKey: ['player-moment-types'],
		queryFn: getAllPlayerMomentTypes,
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	const { data: moments, isLoading: isLoadingMoments } = useQuery({
		queryKey: ['player-moments', seasonId],
		queryFn: () => getPlayerMomentsBySeasonId(seasonId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	const isLoading =
		isLoadingSeasonDetail || isLoadingMomentTypes || isLoadingMoments

	if (!isLoading && !seasonDetail) {
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
						<h1 className="text-lg font-medium">Temporada não encontrada!</h1>
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
							seasonDetail ? (
								<Link
									to="/players/$playerId"
									params={{ playerId: seasonDetail.player.id }}
								>
									<ArrowLeft />
								</Link>
							) : (
								<span>
									<ArrowLeft />
								</span>
							)
						}
					/>
				</header>

				{isLoading ? (
					<div className="space-y-6">
						<div className="space-y-2">
							<Skeleton className="h-9 w-48" />
							<Skeleton className="h-5 w-32" />
						</div>
						<Skeleton className="h-24" />
						<Skeleton className="h-20" />
						<Skeleton className="h-48" />
					</div>
				) : seasonDetail && momentTypes && moments ? (
					<>
						<SeasonInfoSection seasonDetail={seasonDetail} />
						<SeasonMomentsSection
							playerId={seasonDetail.player.id}
							seasonId={seasonId}
							isCurrentSeason={seasonDetail.season.isCurrent}
							momentTypes={momentTypes}
							moments={moments}
						/>
					</>
				) : null}
			</div>
		</main>
	)
}
