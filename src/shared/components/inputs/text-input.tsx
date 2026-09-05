import { Input } from '../ui/input'

type TextInputProps = Omit<React.ComponentProps<typeof Input>, 'inputMode'> & {
	inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}

export function TextInput({
	type = 'text',
	inputMode,
	...props
}: TextInputProps) {
	return (
		<Input
			{...props}
			type={type}
			inputMode={inputMode ?? (type === 'text' ? 'text' : undefined)}
		/>
	)
}
