import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SeasonDetailSegment } from '../api/types/seasons'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
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
	const [expandedSeasonId, setExpandedSeasonId] = useState<string | null>(null)

	const hasStats = useMemo(
		() => segments.some((segment) => segment.stats),
		[segments],
	)

	const hasMultipleSegments = segments.length > 1

	function toggleSegment(seasonId: string) {
		setExpandedSeasonId((current) => (current === seasonId ? null : seasonId))
	}

	if (!hasStats && !hasMultipleSegments) {
		return null
	}

	return (
		<CardList>
			{segments.map((segment) => {
				const isExpanded = expandedSeasonId === segment.seasonId
				const showCurrentBadge = isCurrentSeason && segment.isCurrent

				return (
					<CardListItem key={segment.seasonId}>
						<button
							type="button"
							className="w-full text-left"
							onClick={() => toggleSegment(segment.seasonId)}
							aria-expanded={isExpanded}
						>
							<Card
								className={cn(
									'flex flex-row items-center justify-between gap-4',
									showCurrentBadge &&
										'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30',
									isExpanded && 'border-primary/40',
								)}
							>
								<CardHeader className="flex-1">
									<CardTitle className="flex items-center gap-2 text-lg">
										{segment.club.name}
										{showCurrentBadge ? (
											<span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
												Atual
											</span>
										) : null}
									</CardTitle>
									<CardDescription>
										{hasMultipleSegments
											? `Passagem ${segment.stintIndex}`
											: 'Clube'}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ChevronDown
										className={cn(
											'transition-transform duration-200',
											isExpanded && 'rotate-180',
										)}
									/>
								</CardContent>
							</Card>
						</button>
						{isExpanded ? (
							<div className="mt-2">
								{segment.stats ? (
									<dl className="bg-card grid grid-cols-2 gap-3 rounded-lg border p-3 sm:grid-cols-3">
										{STAT_LABELS.map(({ key, label }) => (
											<div key={key}>
												<dt className="text-muted-foreground text-xs">
													{label}
												</dt>
												<dd className="text-sm font-medium">
													{segment.stats![key]}
												</dd>
											</div>
										))}
									</dl>
								) : (
									<p className="bg-card text-muted-foreground rounded-lg border p-3 text-sm">
										Em andamento
									</p>
								)}
							</div>
						) : null}
					</CardListItem>
				)
			})}
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
