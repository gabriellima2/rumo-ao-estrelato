import type { PlayerSeasonStats } from '../types'

export type AggregatedPlayerSeasonStats = {
	appearances: number
	goals: number
	assists: number
	cleanSheets: number
	yellowCards: number
	redCards: number
	averageRating: number
}

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
	stats: PlayerSeasonStats[],
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
			acc.cleanSheets += item.clean_sheets
			acc.yellowCards += item.yellow_cards
			acc.redCards += item.red_cards

			weightedRatingSum += item.average_rating * item.appearances
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
