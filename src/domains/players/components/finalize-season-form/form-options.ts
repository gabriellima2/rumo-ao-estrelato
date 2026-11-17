import { formOptions } from '@tanstack/react-form'
import type { AchievementItemValues } from './schema'

export const finalizeSeasonFormOpts = formOptions({
	defaultValues: {
		appearances: '',
		goals: '',
		assists: '',
		cleanSheets: '',
		yellowCards: '',
		redCards: '',
		averageRating: '',
		wonAchievements: false,
		achievements: [] as AchievementItemValues[],
		stayedAtClub: true,
		newClubName: '',
	},
})
