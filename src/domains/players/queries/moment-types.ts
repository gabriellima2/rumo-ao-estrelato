import { queryOptions } from '@tanstack/react-query'
import { listMomentTypes, listSelectableMomentTypes } from '../api/moment-types'

export const momentTypeQueries = {
	all: () =>
		queryOptions({
			queryKey: ['player-moment-types', 'all'],
			queryFn: listMomentTypes,
			staleTime: Infinity,
			refetchOnWindowFocus: false,
		}),
	selectable: () =>
		queryOptions({
			queryKey: ['player-moment-types', 'selectable'],
			queryFn: listSelectableMomentTypes,
			staleTime: Infinity,
			refetchOnWindowFocus: false,
		}),
}
