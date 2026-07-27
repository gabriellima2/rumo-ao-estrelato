import type { CountryCode } from '@/shared/catalog/countries'
import type { PlayerPosition } from '../catalog/positions'
import type { Gender } from '@/shared/catalog/genders'

export type GetAllPlayersDTOOutput = Array<{
	firstName: string
	lastName: string
	gender: Gender
	country: CountryCode
	position: PlayerPosition
}>
