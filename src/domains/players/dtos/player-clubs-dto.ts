export type CreatePlayerClubDTOInput = {
	playerId: string
	name: string
}

export type CreatePlayerClubDTOOutput = {
	id: string
}

export type GetAllPlayerClubsDTOOutput = Array<{
	id: string
	playerId: string
	name: string
}>
