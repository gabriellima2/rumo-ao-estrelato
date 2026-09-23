import { formOptions } from '@tanstack/react-form'
import type { AchievementItemValues } from './schema'

export const finalizeSeasonFormOpts = formOptions({
	defaultValues: {
		appearances: 0,
		goals: 0,
		assists: 0,
		cleanSheets: 0,
		yellowCards: 0,
		redCards: 0,
		averageRating: 0,
		wonAchievements: false,
		achievements: [] as AchievementItemValues[],
		stayedAtClub: true,
		newClubName: '',
	},
})
