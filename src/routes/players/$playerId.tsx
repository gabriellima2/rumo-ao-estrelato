import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '@/integrations/supabase/auth-guard'
import {
	PlayerCareerStatsCard,
	PlayerCareerStatsCardSkeleton,
} from '@/domains/players/components/cards/player-career-stats-card'
import {
	PlayerCareerAchievements,
	PlayerCareerAchievementsSkeleton,
} from '@/domains/players/components/player-career-achievements'
import { playerQueries } from '@/domains/players/queries/players'
import { seasonQueries } from '@/domains/players/queries/seasons'
import { Shell, ShellContent } from '@/shared/components/dashboard/shell'
import {
	Header,
	HeaderStart,
	HeaderTitle,
	HeaderTitleSkeleton,
} from '@/shared/components/dashboard/header'
import { BackButton } from '@/shared/components/buttons/back-button'
import { PlayerSeasonCard } from '@/domains/players/components/cards/player-season-card'
import {
	CardList,
	CardListEmpty,
	CardListItem,
	CardListSkeleton,
} from '@/shared/components/dashboard/card-list'
import {
	Section,
	SectionGroup,
	SectionHeader,
	SectionTitle,
	SectionTitleSkeleton,
} from '@/shared/components/dashboard/section'
import { PlayerCareerSummaryHelp } from '@/domains/players/components/player-career-summary-help'

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

	return (
		<Shell>
			<ShellContent>
				<Header>
					<HeaderStart>
						<BackButton to="/players" />
						{isLoadingPlayer ? (
							<HeaderTitleSkeleton />
						) : (
							<HeaderTitle>
								{player
									? `${player.first_name} ${player.last_name}`
									: 'Jogador não encontrado'}
							</HeaderTitle>
						)}
					</HeaderStart>
				</Header>

				{isLoadingPlayer ? (
					<>
						<CareerSummarySkeleton />
						<PlayerSeasonsSkeleton />
					</>
				) : player ? (
					<>
						<CareerSummary playerId={playerId} />
						<PlayerSeasons playerId={playerId} />
					</>
				) : null}
			</ShellContent>
		</Shell>
	)
}

function CareerSummarySkeleton() {
	return (
		<SectionGroup>
			<Section>
				<SectionTitleSkeleton />
				<PlayerCareerStatsCardSkeleton />
			</Section>
			<Section>
				<SectionTitleSkeleton />
				<PlayerCareerAchievementsSkeleton />
			</Section>
		</SectionGroup>
	)
}

function CareerSummary({ playerId }: { playerId: string }) {
	const { data: careerSummary, isLoading: isLoadingCareerSummary } = useQuery({
		...seasonQueries.careerSummary(playerId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	if (isLoadingCareerSummary) {
		return <CareerSummarySkeleton />
	}

	if (!careerSummary) {
		return null
	}

	return (
		<SectionGroup>
			<Section>
				<SectionHeader>
					<SectionTitle>Estatísticas gerais</SectionTitle>
					<PlayerCareerSummaryHelp />
				</SectionHeader>
				<PlayerCareerStatsCard stats={careerSummary.stats} />
			</Section>

			<Section>
				<SectionTitle>Títulos conquistados</SectionTitle>
				<PlayerCareerAchievements
					achievementGroups={careerSummary.achievementGroups}
				/>
			</Section>
		</SectionGroup>
	)
}

function PlayerSeasonsSkeleton() {
	return (
		<Section>
			<SectionTitleSkeleton />
			<CardListSkeleton count={2} />
		</Section>
	)
}

function PlayerSeasons({ playerId }: { playerId: string }) {
	const { data: playerSeasons, isLoading: isLoadingPlayerSeasons } = useQuery({
		...seasonQueries.byPlayer(playerId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	if (isLoadingPlayerSeasons) {
		return <PlayerSeasonsSkeleton />
	}

	if (!playerSeasons) {
		return null
	}

	return (
		<Section>
			<SectionTitle>Temporadas</SectionTitle>
			{playerSeasons.length > 0 ? (
				<CardList>
					{playerSeasons.map((season) => (
						<CardListItem key={season.id}>
							<Link
								to="/players/seasons/$seasonId"
								params={{ seasonId: season.id }}
							>
								<PlayerSeasonCard
									isCurrent={season.isCurrent}
									title={season.title}
									playerClubName={season.playerClubName}
								/>
							</Link>
						</CardListItem>
					))}
				</CardList>
			) : (
				<CardListEmpty align="left">Nenhuma temporada encontrada</CardListEmpty>
			)}
		</Section>
	)
}
