import {
	AchievementTypes,
	getAchievementTypeLabel,
} from '../catalog/achievement-types'
import {
	CompetitionTypes,
	getCompetitionTypeLabel,
} from '../catalog/competition-types'
import type { PlayerAchievementDTO } from '../dtos/player-achievements-dto'
import type { PlayerCareerTitleGroup } from '../dtos/player-seasons-dto'

type SeasonMetadata = {
	title: string
	seasonNumber: number
}

const TITLE_GROUP_ORDER: Array<{
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
	achievements: Array<PlayerAchievementDTO>,
	clubNameById: Map<string, string>,
	seasonById: Map<string, SeasonMetadata>,
): Array<PlayerCareerTitleGroup> {
	const groupedItems = new Map<
		string,
		PlayerCareerTitleGroup['items']
	>()

	for (const achievement of achievements) {
		const key = getAchievementGroupKey(achievement)
		const season = seasonById.get(achievement.playerSeasonId)
		const clubName = clubNameById.get(achievement.playerClubId)

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

	return TITLE_GROUP_ORDER.flatMap(({ key, label }) => {
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

function getAchievementGroupKey(achievement: PlayerAchievementDTO): string {
	if (achievement.achievementType === AchievementTypes.IndividualAward) {
		return AchievementTypes.IndividualAward
	}

	return achievement.competitionType ?? CompetitionTypes.Other
}
