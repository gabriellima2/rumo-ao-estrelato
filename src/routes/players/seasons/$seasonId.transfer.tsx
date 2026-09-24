import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { seasonQueries } from '@/domains/players/queries/seasons'
import { TransferSeasonForm } from '@/domains/players/components/transfer-season-form'
import { TransferSeasonFormSkeleton } from '@/domains/players/components/transfer-season-form/skeleton'
import { Shell, ShellContent } from '@/shared/components/dashboard/shell'
import {
	Header,
	HeaderStart,
	HeaderTitle,
	HeaderTitleSkeleton,
} from '@/shared/components/dashboard/header'
import { BackButton } from '@/shared/components/buttons/back-button'

export const Route = createFileRoute('/players/seasons/$seasonId/transfer')({
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
										? 'Registrar transferência'
										: 'Esta temporada não pode receber transferência'
									: 'Temporada não encontrada'}
							</HeaderTitle>
						)}
					</HeaderStart>
				</Header>

				{isLoading ? (
					<TransferSeasonFormSkeleton />
				) : seasonDetail?.season.isCurrent ? (
					<TransferSeasonForm
						currentSeasonId={seasonDetail.season.currentSeasonId}
						currentClubName={seasonDetail.club.name}
					/>
				) : null}
			</ShellContent>
		</Shell>
	)
}
