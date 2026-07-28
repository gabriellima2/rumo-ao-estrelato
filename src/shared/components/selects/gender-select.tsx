import { useMemo } from 'react'
import { CommonSelect } from './common-select'
import type { SelectOption } from '@/shared/catalog/select'
import { GENDER_LABELS } from '@/shared/catalog/genders'

type GenderSelectProps = Omit<
	React.ComponentProps<typeof CommonSelect>,
	'options'
>

export function GenderSelect(props: GenderSelectProps) {
	const options = useMemo(
		() =>
			Object.entries(GENDER_LABELS).map<SelectOption>(([value, label]) => ({
				value,
				label,
			})),
		[],
	)

	return <CommonSelect {...props} options={options} />
}
