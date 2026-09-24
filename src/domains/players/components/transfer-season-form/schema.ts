import z from 'zod'

import { CompetitionTypes } from '../../catalog/competition-types'
import { AchievementTypes } from '../../catalog/achievement-types'

const nonNegativeNumber = z
	.number({ error: 'Valor inválido' })
	.min(0, 'Mínimo 0')

const achievementItemSchema = z.object({
	name: z.string().trim().min(1, 'Nome obrigatório'),
	achievementType: z.enum(Object.values(AchievementTypes)),
	competitionType: z.enum(Object.values(CompetitionTypes)).nullable(),
})

const statsStepSchema = z.object({
	appearances: nonNegativeNumber,
	goals: nonNegativeNumber,
	assists: nonNegativeNumber,
	cleanSheets: nonNegativeNumber,
	yellowCards: nonNegativeNumber,
	redCards: nonNegativeNumber,
	averageRating: z
		.number({ error: 'Valor inválido' })
		.min(0, 'Mínimo 0')
		.max(10, 'Máximo 10'),
})

const achievementsStepSchema = z.object({
	wonAchievements: z.boolean(),
	achievements: z.array(achievementItemSchema),
})

const newClubStepSchema = z.object({
	newClubName: z
		.string()
		.trim()
		.min(1, 'Nome do novo clube é obrigatório')
		.min(2, 'Mínimo de 2 caracteres'),
})

export const transferSeasonFormSchema = statsStepSchema
	.merge(achievementsStepSchema)
	.merge(newClubStepSchema)

export const TRANSFER_SEASON_STEP_SCHEMAS = {
	stats: statsStepSchema,
	achievements: achievementsStepSchema,
	'new-club': newClubStepSchema,
} as const

export type TransferSeasonFormValues = z.infer<typeof transferSeasonFormSchema>
export type AchievementItemValues = z.infer<typeof achievementItemSchema>
