import z from 'zod'

export type SelectOption = {
	label: string
	value: string
}

export const EMPTY_SEARCHABLE_SELECT_OPTION: SelectOption = {
	label: '',
	value: '',
}

export const searchableSelectSchema = z.object({
	label: z.string().trim(),
	value: z.string().trim(),
})

export type SelectSearchableSchema = z.infer<typeof searchableSelectSchema>
