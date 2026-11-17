import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { getPlayerPositionLabel } from '@/domains/players/catalog/positions'
import {
	PlayerSeasonClubStats,
	PlayerSeasonClubStatsSkeleton,
} from '@/domains/players/components/player-season-club-stats'
import { PlayerSeasonHeaderActions } from '@/domains/players/components/player-season-header-actions'
import {
	PlayerSeasonInfo,
	PlayerSeasonInfoSkeleton,
} from '@/domains/players/components/player-season-info'
import {
	PlayerMoments,
	PlayerMomentsSkeleton,
} from '@/domains/players/components/player-moments'
import { momentTypeQueries } from '@/domains/players/queries/moment-types'
import { momentQueries } from '@/domains/players/queries/moments'
import { seasonQueries } from '@/domains/players/queries/seasons'
import {
	BackButton,
	BackButtonSkeleton,
} from '@/shared/components/buttons/back-button'
import { Shell, ShellContent } from '@/shared/components/dashboard/shell'
import {
	Header,
	HeaderDescription,
	HeaderStart,
	HeaderTextGroup,
	HeaderTitle,
	HeaderTitleSkeleton,
} from '@/shared/components/dashboard/header'
import {
	Section,
	SectionGroup,
	SectionTitle,
	SectionTitleSkeleton,
} from '@/shared/components/dashboard/section'
import {
	PlayerMomentsForm,
	PlayerMomentsFormSkeleton,
} from '@/domains/players/components/player-moments-form'

export const Route = createFileRoute('/_protected/players/seasons/$seasonId/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { seasonId } = Route.useParams()

	const { data: seasonDetail, isLoading: isLoadingSeasonDetail } = useQuery({
		...seasonQueries.detail(seasonId),
		throwOnError: true,
	})

	const segments = useMemo(() => seasonDetail?.segments ?? [], [seasonDetail])
	const season = seasonDetail?.season
	const player = seasonDetail?.player

	const segmentSeasonIds = useMemo(
		() => segments.map((segment) => segment.seasonId),
		[segments],
	)

	const currentSeasonId = useMemo(
		() =>
			segments.find((segment) => segment.isCurrent)?.seasonId ??
			season?.currentSeasonId ??
			seasonId,
		[segments, season, seasonId],
	)

	return (
		<Shell>
			<ShellContent>
				<Header>
					<HeaderStart>
						{isLoadingSeasonDetail ? (
							<BackButtonSkeleton />
						) : (
							<BackButton
								to={seasonDetail ? '/players/$playerId' : '/players'}
								params={
									seasonDetail
										? { playerId: seasonDetail.player.id }
										: undefined
								}
							/>
						)}
						<HeaderTextGroup>
							{isLoadingSeasonDetail ? (
								<HeaderTitleSkeleton />
							) : season && player ? (
								<>
									<HeaderTitle>{season.title}</HeaderTitle>
									<HeaderDescription>
										{player.firstName} {player.lastName} ·{' '}
										{getPlayerPositionLabel(player.position)} ·{' '}
										{player.countryName}
									</HeaderDescription>
								</>
							) : (
								<HeaderTitle>Temporada não encontrada</HeaderTitle>
							)}
						</HeaderTextGroup>
					</HeaderStart>
					{season ? (
						<PlayerSeasonHeaderActions
							isCurrentSeason={season.isCurrent}
							currentSeasonId={season.currentSeasonId}
						/>
					) : null}
				</Header>

				{isLoadingSeasonDetail ? (
					<>
						<PlayerSeasonInfoSkeleton />
						<PlayerSeasonClubStatsSkeleton />
						<PlayerMomentsSectionSkeleton />
					</>
				) : seasonDetail && season && player ? (
					<>
						<PlayerSeasonInfo seasonDetail={seasonDetail} />
						<SectionGroup>
							<PlayerSeasonClubStats
								segments={segments}
								isCurrentSeason={season.isCurrent}
							/>
							<PlayerMomentsSection
								playerId={player.id}
								segmentSeasonIds={segmentSeasonIds}
								currentSeasonId={currentSeasonId}
								isCurrentSeason={season.isCurrent}
							/>
						</SectionGroup>
					</>
				) : null}
			</ShellContent>
		</Shell>
	)
}

function PlayerMomentsSectionSkeleton() {
	return (
		<Section>
			<SectionTitleSkeleton />
			<PlayerMomentsFormSkeleton />
			<PlayerMomentsSkeleton />
		</Section>
	)
}

function PlayerMomentsSection({
	playerId,
	segmentSeasonIds,
	currentSeasonId,
	isCurrentSeason,
}: {
	playerId: string
	segmentSeasonIds: string[]
	currentSeasonId: string
	isCurrentSeason: boolean
}) {
	const { data: momentTypes, isLoading: isLoadingMomentTypes } = useQuery({
		...momentTypeQueries.selectable(),
		throwOnError: true,
	})

	const { data: moments, isLoading: isLoadingMoments } = useQuery({
		...momentQueries.bySeasonIds(segmentSeasonIds),
		throwOnError: true,
	})

	if (isLoadingMomentTypes || isLoadingMoments) {
		return <PlayerMomentsSectionSkeleton />
	}

	if (!momentTypes || !moments) {
		return null
	}

	return (
		<Section>
			<SectionTitle>Momentos</SectionTitle>
			{isCurrentSeason && (
				<PlayerMomentsForm
					playerId={playerId}
					seasonId={currentSeasonId}
					momentTypes={momentTypes}
				/>
			)}
			<PlayerMoments moments={moments} />
		</Section>
	)
}
