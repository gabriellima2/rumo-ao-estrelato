import { queryOptions } from '@tanstack/react-query'
import { listMomentTypes } from '../api/moment-types'

export const momentTypeQueries = {
	all: () =>
		queryOptions({
			queryKey: ['player-moment-types'],
			queryFn: listMomentTypes,
			staleTime: Infinity,
		}),
}
