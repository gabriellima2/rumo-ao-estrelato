export const CompetitionTypes = {
	League: 'league',
	State: 'state',
	NationalCup: 'national_cup',
	LeagueCup: 'league_cup',
	SuperCup: 'super_cup',
	Continental: 'continental',
	International: 'international',
	Other: 'other',
} as const

export type CompetitionType =
	(typeof CompetitionTypes)[keyof typeof CompetitionTypes]

export const COMPETITION_TYPE_LABELS: Record<CompetitionType, string> = {
	[CompetitionTypes.League]: 'Liga',
	[CompetitionTypes.State]: 'Estadual',
	[CompetitionTypes.NationalCup]: 'Copa nacional',
	[CompetitionTypes.LeagueCup]: 'Copa da liga',
	[CompetitionTypes.SuperCup]: 'Supercopa',
	[CompetitionTypes.Continental]: 'Continental',
	[CompetitionTypes.International]: 'Internacional',
	[CompetitionTypes.Other]: 'Outro',
} as const

export const getCompetitionTypeLabel = (competitionType: CompetitionType) =>
	COMPETITION_TYPE_LABELS[competitionType]
