import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SearchableSelect } from './searchable-select'
import type { SelectOption } from '@/shared/catalog/select'
import { countryQueries } from '@/domains/players/queries/countries'

type CountrySelectProps = Omit<
	React.ComponentProps<typeof SearchableSelect>,
	'options'
>

export function CountrySelect(props: CountrySelectProps) {
	const { data: countries, isLoading } = useQuery(countryQueries.options())

	const options = useMemo(
		() =>
			(countries ?? []).map<SelectOption>((country) => ({
				value: country.id,
				label: country.name,
			})),
		[countries],
	)

	return <SearchableSelect {...props} options={options} isLoading={isLoading} />
}
