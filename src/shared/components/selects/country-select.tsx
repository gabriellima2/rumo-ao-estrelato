import { useMemo } from 'react'
import { SearchableSelect } from './searchable-select'
import type { SelectOption } from '@/shared/catalog/select'
import { COUNTRIES } from '@/shared/catalog/countries'

type CountrySelectProps = Omit<
	React.ComponentProps<typeof SearchableSelect>,
	'options'
>

export function CountrySelect(props: CountrySelectProps) {
	const options = useMemo(
		() =>
			Object.entries(COUNTRIES).map<SelectOption>(([value, { name }]) => ({
				value,
				label: name,
			})),
		[],
	)

	return <SearchableSelect {...props} options={options} />
}
