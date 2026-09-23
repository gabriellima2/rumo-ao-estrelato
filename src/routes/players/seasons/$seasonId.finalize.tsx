import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { seasonQueries } from '@/domains/players/queries/seasons'
import { FinalizeSeasonForm } from '@/domains/players/components/finalize-season-form'
import { Shell, ShellContent } from '@/shared/components/dashboard/shell'
import {
	Header,
	HeaderStart,
	HeaderTitle,
	HeaderTitleSkeleton,
} from '@/shared/components/dashboard/header'
import { BackButton } from '@/shared/components/buttons/back-button'
import { FinalizeSeasonFormSkeleton } from '@/domains/players/components/finalize-season-form/skeleton'

export const Route = createFileRoute('/players/seasons/$seasonId/finalize')({
	component: RouteComponent,
})

function RouteComponent() {
	const { seasonId } = Route.useParams()

	const { data: seasonDetail, isLoading } = useQuery({
		...seasonQueries.detail(seasonId),
		throwOnError: true,
	})

	return (
		<Shell>
			<ShellContent>
				<Header>
					<HeaderStart>
						<BackButton to="/players/seasons/$seasonId" params={{ seasonId }} />
						{isLoading ? (
							<HeaderTitleSkeleton />
						) : (
							<HeaderTitle>
								{seasonDetail
									? seasonDetail.season.isCurrent
										? 'Finalizar temporada'
										: 'Esta temporada não pode ser finalizada'
									: 'Temporada não encontrada'}
							</HeaderTitle>
						)}
					</HeaderStart>
				</Header>

				{isLoading ? (
					<FinalizeSeasonFormSkeleton />
				) : seasonDetail ? (
					<FinalizeSeasonForm
						seasonId={seasonId}
						currentClubName={seasonDetail.club.name}
					/>
				) : null}
			</ShellContent>
		</Shell>
	)
}
