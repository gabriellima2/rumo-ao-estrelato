import { Input } from '../ui/input'
import { numbersMask } from '@/shared/utils/masks'

export function NumberInput(
	props: Omit<
		React.ComponentProps<typeof Input>,
		'type' | 'inputMode' | 'mask'
	>,
) {
	return <Input {...props} type="text" mask={numbersMask} inputMode="numeric" />
}
