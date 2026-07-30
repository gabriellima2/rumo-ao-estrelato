export type CreatePlayerSeasonDTOInput = {
	playerId: string
	playerClubId: string
	title: string
	seasonNumber: number
	isCurrent: boolean
}

export type GetAllPlayerSeasonsDTOOutput = Array<{
	id: string
	playerId: string
	playerClubId: string
	title: string
	seasonNumber: number
	isCurrent: boolean
}>

export type GetPlayerSeasonsByPlayerIdDTOOutput = Array<{
	id: string
	playerId: string
	playerClubId: string
	title: string
	seasonNumber: number
	isCurrent: boolean
}>
