import type { CountryCode } from '@/shared/catalog/countries'
import type { PlayerPosition } from '../catalog/positions'
import type { Gender } from '@/shared/catalog/genders'

export type CreatePlayerDTOInput = {
	firstName: string
	lastName: string
	gender: Gender
	country: CountryCode
	position: PlayerPosition
}

export type CreatePlayerDTOOutput = {
	id: string
}

export type GetAllPlayersDTOOutput = Array<{
	id: string
	firstName: string
	lastName: string
	gender: Gender
	country: CountryCode
	position: PlayerPosition
}>

export type GetPlayerByIdDTOOutput =
	| {
			id: string
			firstName: string
			lastName: string
			gender: Gender
			country: CountryCode
			position: PlayerPosition
	  }
	| undefined
