import { formOptions } from '@tanstack/react-form'
import type { AchievementItemValues } from './schema'

export const transferSeasonFormOpts = formOptions({
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
		newClubName: '',
	},
})
