import { Input } from '../ui/input'

export function TextInput(
	props: Omit<React.ComponentProps<typeof Input>, 'type' | 'inputMode'>,
) {
	return <Input {...props} type="text" inputMode="text" />
}
