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

const nextSeasonStepSchema = z
	.object({
		stayedAtClub: z.boolean(),
		newClubName: z.string(),
	})
	.superRefine((value, ctx) => {
		if (!value.stayedAtClub && !value.newClubName.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: 'Nome do novo clube é obrigatório',
				path: ['newClubName'],
			})
		}

		if (
			!value.stayedAtClub &&
			value.newClubName.trim().length > 0 &&
			value.newClubName.trim().length < 2
		) {
			ctx.addIssue({
				code: 'custom',
				message: 'Mínimo de 2 caracteres',
				path: ['newClubName'],
			})
		}
	})

export const finalizeSeasonFormSchema = statsStepSchema
	.merge(achievementsStepSchema)
	.merge(nextSeasonStepSchema)

export const FINALIZE_SEASON_STEP_SCHEMAS = {
	stats: statsStepSchema,
	achievements: achievementsStepSchema,
	'next-season': nextSeasonStepSchema,
} as const

export type FinalizeSeasonFormValues = z.infer<typeof finalizeSeasonFormSchema>
export type AchievementItemValues = z.infer<typeof achievementItemSchema>
