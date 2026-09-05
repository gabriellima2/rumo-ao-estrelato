import { queryOptions } from '@tanstack/react-query'
import { listCountriesOptions } from '../api/countries'

export const countryQueries = {
	options: () =>
		queryOptions({
			queryKey: ['countries-options'],
			queryFn: listCountriesOptions,
			staleTime: Infinity,
		}),
}
