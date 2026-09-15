import { hasAnyCareerStats } from '../../utils/aggregate-player-season-stats'
import type { AggregatedPlayerSeasonStats } from '../../utils/aggregate-player-season-stats'
import {
	Card,
	CardContent,
	CardHeader,
	CardSkeleton,
	CardTitle,
} from '@/shared/components/ui/card'

type PlayerCareerStatsCardProps = {
	stats: AggregatedPlayerSeasonStats
}

export function PlayerCareerStatsCard({ stats }: PlayerCareerStatsCardProps) {
	const hasStats = hasAnyCareerStats(stats)

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Carreira</CardTitle>
			</CardHeader>
			<CardContent>
				{hasStats ? (
					<dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
						{STAT_LABELS.map(({ key, label }) => (
							<div key={key}>
								<dt className="text-muted-foreground text-xs">{label}</dt>
								<dd className="text-sm font-medium">{stats[key]}</dd>
							</div>
						))}
					</dl>
				) : (
					<p className="text-muted-foreground text-sm">
						Nenhuma estatística registrada
					</p>
				)}
			</CardContent>
		</Card>
	)
}

export function PlayerCareerStatsCardSkeleton() {
	return <CardSkeleton className="h-40" />
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
