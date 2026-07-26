import type { SelectOption } from '@/shared/catalog/select'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxLoading,
} from '@/shared/components/ui/combobox'
import { EMPTY_SEARCHABLE_SELECT_OPTION } from '@/shared/catalog/select'

type SearchableSelectProps = Pick<
	React.ComponentProps<typeof ComboboxInput>,
	'id' | 'name' | 'onBlur' | 'aria-invalid' | 'placeholder' | 'isLoading'
> & {
	value: SelectOption
	defaultValue?: SelectOption
	options: Array<SelectOption>
	empty?: React.ReactNode
	onValueChange: (value: SelectOption) => void
}

export function SearchableSelect({
	value,
	defaultValue,
	options,
	isLoading,
	empty,
	placeholder = 'Selecione uma opção...',
	onValueChange,
	...inputProps
}: SearchableSelectProps) {
	return (
		<Combobox
			value={value.value ? value : EMPTY_SEARCHABLE_SELECT_OPTION}
			defaultValue={defaultValue}
			items={options}
			onValueChange={(_value) =>
				onValueChange(_value ?? EMPTY_SEARCHABLE_SELECT_OPTION)
			}
			isItemEqualToValue={(item, selected) => item.value === selected.value}
		>
			<ComboboxInput {...inputProps} placeholder={placeholder} />
			<ComboboxContent>
				{isLoading ? (
					<ComboboxLoading />
				) : (
					<>
						<ComboboxEmpty>{empty ?? 'Nenhuma opção encontrada'}</ComboboxEmpty>
						<ComboboxList>
							{(item: SelectOption) => (
								<ComboboxItem key={item.value} value={item}>
									{item.label}
								</ComboboxItem>
							)}
						</ComboboxList>
					</>
				)}
			</ComboboxContent>
		</Combobox>
	)
}
