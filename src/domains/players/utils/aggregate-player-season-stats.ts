import type { PlayerSeasonStatsDTO } from '../dtos/player-season-stats-dto'
import type { AggregatedPlayerSeasonStats } from '../dtos/player-seasons-dto'

const EMPTY_STATS: AggregatedPlayerSeasonStats = {
	appearances: 0,
	goals: 0,
	assists: 0,
	cleanSheets: 0,
	yellowCards: 0,
	redCards: 0,
	averageRating: 0,
}

export function aggregatePlayerSeasonStats(
	stats: Array<PlayerSeasonStatsDTO>,
): AggregatedPlayerSeasonStats {
	if (stats.length === 0) {
		return EMPTY_STATS
	}

	let weightedRatingSum = 0
	let totalAppearances = 0

	const aggregated = stats.reduce(
		(acc, item) => {
			acc.appearances += item.appearances
			acc.goals += item.goals
			acc.assists += item.assists
			acc.cleanSheets += item.cleanSheets
			acc.yellowCards += item.yellowCards
			acc.redCards += item.redCards

			weightedRatingSum += item.averageRating * item.appearances
			totalAppearances += item.appearances

			return acc
		},
		{ ...EMPTY_STATS },
	)

	aggregated.averageRating =
		totalAppearances > 0
			? Math.round((weightedRatingSum / totalAppearances) * 10) / 10
			: 0

	return aggregated
}

export function hasAnyCareerStats(stats: AggregatedPlayerSeasonStats): boolean {
	return (
		stats.appearances > 0 ||
		stats.goals > 0 ||
		stats.assists > 0 ||
		stats.cleanSheets > 0 ||
		stats.yellowCards > 0 ||
		stats.redCards > 0 ||
		stats.averageRating > 0
	)
}
