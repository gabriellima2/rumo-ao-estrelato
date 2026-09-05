import type { SeasonDetailSegment } from '../api/types/seasons'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'

type SeasonClubStatsSectionProps = {
	segments: SeasonDetailSegment[]
	isCurrentSeason: boolean
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

export function SeasonClubStatsSection({
	segments,
	isCurrentSeason,
}: SeasonClubStatsSectionProps) {
	const hasStats = segments.some((segment) => segment.stats)
	const hasMultipleSegments = segments.length > 1

	if (!hasStats && !hasMultipleSegments) {
		return null
	}

	return (
		<section className="space-y-4">
			<h2 className="text-xl font-semibold">Estatísticas por clube</h2>
			<ul className="space-y-4">
				{segments.map((segment) => (
					<li key={segment.seasonId}>
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
									<p className="text-muted-foreground text-sm">Em andamento</p>
								)}
							</CardContent>
						</Card>
					</li>
				))}
			</ul>
		</section>
	)
}
