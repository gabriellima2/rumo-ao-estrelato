export const AchievementTypes = {
	Competition: 'competition',
	IndividualAward: 'individual_award',
} as const

export type AchievementType =
	(typeof AchievementTypes)[keyof typeof AchievementTypes]

export const ACHIEVEMENT_TYPE_LABELS: Record<AchievementType, string> = {
	[AchievementTypes.Competition]: 'Competição',
	[AchievementTypes.IndividualAward]: 'Prêmio individual',
} as const

export const getAchievementTypeLabel = (achievementType: AchievementType) =>
	ACHIEVEMENT_TYPE_LABELS[achievementType]
