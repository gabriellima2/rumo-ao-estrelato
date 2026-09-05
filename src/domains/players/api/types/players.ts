import type { PlayerPosition } from '../../catalog/positions'
import type { Gender } from '@/shared/catalog/genders'

export type CreatePlayerCareerInput = {
	firstName: string
	lastName: string
	gender: Gender
	countryId: string
	position: PlayerPosition
	clubName: string
}
