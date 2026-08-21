export type PlayerSeasonStatsDTO = {
	id: string
	playerId: string
	playerSeasonId: string
	playerClubId: string
	appearances: number
	goals: number
	assists: number
	cleanSheets: number
	yellowCards: number
	redCards: number
	averageRating: number
}

export type CreatePlayerSeasonStatsDTOInput = {
	playerId: string
	playerSeasonId: string
	playerClubId: string
	appearances: number
	goals: number
	assists: number
	cleanSheets: number
	yellowCards: number
	redCards: number
	averageRating: number
}

export type GetPlayerSeasonStatsBySeasonIdDTOOutput =
	PlayerSeasonStatsDTO | undefined

export type GetAllPlayerSeasonStatsByPlayerIdDTOOutput =
	Array<PlayerSeasonStatsDTO>
