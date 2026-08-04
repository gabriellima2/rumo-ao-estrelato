export type PlayerMomentTypeDTO = {
	id: string
	name: string
	icon: string
	color: string
	isSystem: boolean
}

export type GetAllPlayerMomentTypesDTOOutput = Array<PlayerMomentTypeDTO>
