export type CreatePlayerMomentDTOInput = {
	playerId: string
	playerSeasonId: string
	title: string
	description?: string
	playerMomentTypeId: string
}

export type GetPlayerMomentsBySeasonIdDTOOutput = Array<{
	id: string
	playerId: string
	playerSeasonId: string
	title: string
	description?: string
	playerMomentTypeId: string
	playerMomentTypeName: string
	playerMomentTypeIcon: string
	playerMomentTypeColor: string
	isFavorite: boolean
	createdAt: string
}>
