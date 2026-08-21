import { hasAnyCareerStats } from '../utils/aggregate-player-season-stats'
import { PlayerCareerSummaryHelp } from './player-career-summary-help'
import type { AggregatedPlayerSeasonStats } from '../dtos/player-seasons-dto'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'

type PlayerCareerStatsSectionProps = {
	stats: AggregatedPlayerSeasonStats
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

export function PlayerCareerStatsSection({
	stats,
}: PlayerCareerStatsSectionProps) {
	const hasStats = hasAnyCareerStats(stats)

	return (
		<section className="flex flex-col gap-4">
			<div className="flex items-center gap-1">
				<h2 className="text-xl font-semibold">Estatísticas gerais</h2>
				<PlayerCareerSummaryHelp />
			</div>
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
		</section>
	)
}
