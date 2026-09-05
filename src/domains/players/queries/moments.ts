import { queryOptions } from '@tanstack/react-query'
import {
	createMoment,
	listMomentsBySeason,
	listMomentsBySeasonIds,
} from '../api/moments'

export const momentQueries = {
	bySeason: (seasonId: string) =>
		queryOptions({
			queryKey: ['player-moments', seasonId],
			queryFn: () => listMomentsBySeason(seasonId),
		}),
	bySeasonIds: (seasonIds: string[]) =>
		queryOptions({
			queryKey: ['player-moments', seasonIds],
			queryFn: () => listMomentsBySeasonIds(seasonIds),
			enabled: seasonIds.length > 0,
		}),
}

export const momentMutations = {
	create: createMoment,
}
