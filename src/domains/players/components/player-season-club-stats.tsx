import { useMemo } from 'react'
import type { SeasonDetailSegment } from '../api/types/seasons'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import {
	CardList,
	CardListItem,
	CardListSkeleton,
} from '@/shared/components/dashboard/card-list'

type PlayerSeasonClubStatsProps = {
	segments: SeasonDetailSegment[]
	isCurrentSeason: boolean
}

export function PlayerSeasonClubStats({
	segments,
	isCurrentSeason,
}: PlayerSeasonClubStatsProps) {
	const hasStats = useMemo(
		() => segments.some((segment) => segment.stats),
		[segments],
	)

	const hasMultipleSegments = segments.length > 1

	if (!hasStats && !hasMultipleSegments) {
		return null
	}

	return (
		<CardList>
			{segments.map((segment) => (
				<CardListItem key={segment.seasonId}>
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">{segment.club.name}</CardTitle>
							<CardDescription>
								{hasMultipleSegments
									? `Passagem ${segment.stintIndex}`
									: 'Clube'}
								{isCurrentSeason && segment.isCurrent ? ' · Atual' : ''}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{segment.stats ? (
								<dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
									{STAT_LABELS.map(({ key, label }) => (
										<div key={key}>
											<dt className="text-muted-foreground text-xs">{label}</dt>
											<dd className="text-sm font-medium">
												{segment.stats![key]}
											</dd>
										</div>
									))}
								</dl>
							) : (
								<p className="text-muted-foreground text-sm">Em andamento</p>
							)}
						</CardContent>
					</Card>
				</CardListItem>
			))}
		</CardList>
	)
}

export function PlayerSeasonClubStatsSkeleton() {
	return <CardListSkeleton count={1} />
}

const STAT_LABELS = [
	{ key: 'appearances' as const, label: 'Jogos' },
	{ key: 'goals' as const, label: 'Gols' },
	{ key: 'assists' as const, label: 'Assistências' },
	{ key: 'cleanSheets' as const, label: 'Clean sheets' },
	{ key: 'yellowCards' as const, label: 'Amarelos' },
	{ key: 'redCards' as const, label: 'Vermelhos' },
	{ key: 'averageRating' as const, label: 'Nota média' },
]
