import {
	AchievementTypes,
	getAchievementTypeLabel,
} from '../catalog/achievement-types'
import {
	CompetitionTypes,
	getCompetitionTypeLabel,
} from '../catalog/competition-types'
import type { PlayerAchievement } from '../types'

type SeasonMetadata = {
	title: string
	seasonNumber: number
}

export type PlayerCareerAchievementItem = {
	id: string
	name: string
	seasonTitle: string
	seasonNumber: number
	clubName: string
}

export type PlayerCareerAchievementGroup = {
	key: string
	label: string
	count: number
	items: PlayerCareerAchievementItem[]
}

const ACHIEVEMENT_GROUP_ORDER: Array<{
	key: string
	label: string
}> = [
	...Object.values(CompetitionTypes).map((type) => ({
		key: type,
		label: getCompetitionTypeLabel(type),
	})),
	{
		key: AchievementTypes.IndividualAward,
		label: getAchievementTypeLabel(AchievementTypes.IndividualAward),
	},
]

export function groupPlayerAchievements(
	achievements: PlayerAchievement[],
	clubNameById: Map<string, string>,
	seasonById: Map<string, SeasonMetadata>,
): PlayerCareerAchievementGroup[] {
	const groupedItems = new Map<string, PlayerCareerAchievementGroup['items']>()

	for (const achievement of achievements) {
		const key = getAchievementGroupKey(achievement)
		const season = seasonById.get(achievement.player_season_id)
		const clubName = clubNameById.get(achievement.player_club_id)

		if (!season || !clubName) {
			continue
		}

		const items = groupedItems.get(key) ?? []
		items.push({
			id: achievement.id,
			name: achievement.name,
			seasonTitle: season.title,
			seasonNumber: season.seasonNumber,
			clubName,
		})
		groupedItems.set(key, items)
	}

	return ACHIEVEMENT_GROUP_ORDER.flatMap(({ key, label }) => {
		const items = groupedItems.get(key)

		if (!items || items.length === 0) {
			return []
		}

		return [
			{
				key,
				label,
				count: items.length,
				items: [...items].sort(
					(a, b) =>
						b.seasonNumber - a.seasonNumber ||
						a.name.localeCompare(b.name, 'pt-BR'),
				),
			},
		]
	})
}

function getAchievementGroupKey(achievement: PlayerAchievement): string {
	if (achievement.achievement_type === AchievementTypes.IndividualAward) {
		return AchievementTypes.IndividualAward
	}

	return achievement.competition_type ?? CompetitionTypes.Other
}
