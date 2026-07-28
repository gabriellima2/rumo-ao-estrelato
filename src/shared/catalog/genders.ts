export const Genders = {
	Male: 'male',
	Female: 'female',
} as const

export type Gender = (typeof Genders)[keyof typeof Genders]

export const GENDER_LABELS: Record<Gender, string> = {
	[Genders.Male]: 'Masculino',
	[Genders.Female]: 'Feminino',
} as const
