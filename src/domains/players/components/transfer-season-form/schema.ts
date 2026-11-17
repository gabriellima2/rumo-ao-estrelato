import z from 'zod'

import { CompetitionTypes } from '../../catalog/competition-types'
import { AchievementTypes } from '../../catalog/achievement-types'
import {
	averageRatingStat,
	nonNegativeStat,
} from '../../validation/stat-field-zod'

const achievementItemSchema = z.object({
	name: z.string().trim().min(1, 'Nome obrigatório'),
	achievementType: z.enum(Object.values(AchievementTypes)),
	competitionType: z.enum(Object.values(CompetitionTypes)).nullable(),
})

const statsStepSchema = z.object({
	appearances: nonNegativeStat('Informe os jogos'),
	goals: nonNegativeStat('Informe os gols'),
	assists: nonNegativeStat('Informe as assistências'),
	cleanSheets: nonNegativeStat('Informe os clean sheets'),
	yellowCards: nonNegativeStat('Informe os cartões amarelos'),
	redCards: nonNegativeStat('Informe os cartões vermelhos'),
	averageRating: averageRatingStat('Informe a nota média'),
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
