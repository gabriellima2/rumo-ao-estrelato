import z from 'zod'
import type { SelectOption } from './select'

export const Genders = {
	Male: 'male',
	Female: 'female',
} as const

export type Gender = (typeof Genders)[keyof typeof Genders]

export const GenderSchema = z.enum(Object.values(Genders))

export const GENDER_LABELS: Record<Gender, string> = {
	[Genders.Male]: 'Masculino',
	[Genders.Female]: 'Feminino',
} as const

export const GENDER_SELECT_OPTIONS = Object.entries(
	GENDER_LABELS,
).map<SelectOption>(([value, label]) => ({
	value,
	label,
}))
