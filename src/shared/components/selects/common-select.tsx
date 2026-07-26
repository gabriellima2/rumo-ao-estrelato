import { useMemo } from 'react'
import type { SelectOption } from '@/shared/catalog/select'
import {
	Select,
	SelectContent,
	SelectEmpty,
	SelectGroup,
	SelectItem,
	SelectLoading,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'

type CommonSelectProps<T extends string> = Pick<
	React.ComponentProps<typeof SelectTrigger>,
	'id' | 'name' | 'onBlur' | 'aria-invalid'
> & {
	value: T
	defaultValue?: T
	options: Array<SelectOption>
	isLoading?: boolean
	clearable?: boolean
	placeholder?: string
	empty?: React.ReactNode
	onValueChange: (value: T) => void
}

export function CommonSelect<T extends string>({
	value,
	defaultValue,
	options,
	isLoading,
	clearable = true,
	placeholder,
	empty,
	onValueChange,
	...triggerProps
}: CommonSelectProps<T>) {
	const _options = useMemo(() => {
		return [
			...(clearable
				? [{ value: '', label: placeholder ?? 'Selecione uma opção...' }]
				: []),
			...options,
		]
	}, [clearable, placeholder, options])

	return (
		<Select
			value={value}
			defaultValue={defaultValue}
			items={_options}
			onValueChange={(_value) => onValueChange(_value as T)}
		>
			<SelectTrigger {...triggerProps} isLoading={isLoading}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{isLoading ? (
						<SelectLoading />
					) : _options.length > 1 ? (
						_options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))
					) : (
						<SelectEmpty>{empty ?? 'Nenhuma opção encontrada'}</SelectEmpty>
					)}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
