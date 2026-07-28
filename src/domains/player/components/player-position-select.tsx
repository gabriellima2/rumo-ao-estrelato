import { useMemo } from 'react'
import { CommonSelect } from '../../../shared/components/selects/common-select'
import type { SelectOption } from '@/shared/catalog/select'
import { PLAYER_POSITION_LABELS } from '@/domains/player/catalog/positions'

type PlayerPositionSelectProps = Omit<
	React.ComponentProps<typeof CommonSelect>,
	'options'
>

export function PlayerPositionSelect(props: PlayerPositionSelectProps) {
	const options = useMemo(
		() =>
			Object.entries(PLAYER_POSITION_LABELS).map<SelectOption>(
				([value, label]) => ({
					value,
					label,
				}),
			),
		[],
	)

	return <CommonSelect {...props} options={options} />
}
