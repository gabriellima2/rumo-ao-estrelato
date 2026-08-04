import type { CountryCode } from '@/shared/catalog/countries'
import type { PlayerPosition } from '../catalog/positions'

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

export type GetAllPlayerSeasonsByPlayerIdDTOOutput = Array<{
	id: string
	playerId: string
	playerClubId: string
	playerClubName: string | undefined
	title: string
	seasonNumber: number
	isCurrent: boolean
}>

export type GetPlayerSeasonByIdDTOOutput =
	| {
			id: string
			playerId: string
			playerClubId: string
			playerClubName: string | undefined
			title: string
			seasonNumber: number
			isCurrent: boolean
	  }
	| undefined

export type GetSeasonDetailDTOOutput =
	| {
			season: {
				id: string
				title: string
				seasonNumber: number
				isCurrent: boolean
				playerClubName: string | undefined
			}
			player: {
				id: string
				firstName: string
				lastName: string
				position: PlayerPosition
				country: CountryCode
			}
			club: {
				id: string
				name: string
			}
	  }
	| undefined
