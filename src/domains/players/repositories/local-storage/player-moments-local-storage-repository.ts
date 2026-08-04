import { STORAGE_KEYS } from './@constants'
import type { PlayerMomentsRepository } from '../player-moments-repository'
import type {
	CreatePlayerMomentDTOInput,
	GetPlayerMomentsBySeasonIdDTOOutput,
} from '../../dtos/player-moments-dto'
import type { GetAllPlayerMomentTypesDTOOutput } from '../../dtos/player-moment-types-dto'

type StoredPlayerMoment = {
	id: string
	playerId: string
	playerSeasonId: string
	title: string
	description?: string
	playerMomentTypeId: string
	isFavorite: boolean
	createdAt: string
}

function normalizeDescription(description?: string) {
	const trimmed = description?.trim()
	return trimmed ? trimmed : undefined
}

export class PlayerMomentsLocalStorageRepository implements PlayerMomentsRepository {
	private readonly storageKey = STORAGE_KEYS.PLAYER_MOMENTS
	private readonly momentTypesStorageKey = STORAGE_KEYS.PLAYER_MOMENT_TYPES

	async create(input: CreatePlayerMomentDTOInput): Promise<void> {
		const current = await this.getStoredMoments()

		current.push({
			id: Math.random().toString(),
			playerId: input.playerId,
			playerSeasonId: input.playerSeasonId,
			title: input.title,
			description: normalizeDescription(input.description),
			playerMomentTypeId: input.playerMomentTypeId,
			isFavorite: false,
			createdAt: new Date().toISOString(),
		})

		localStorage.setItem(this.storageKey, JSON.stringify(current))
	}

	async getAllBySeasonId(
		seasonId: string,
	): Promise<GetPlayerMomentsBySeasonIdDTOOutput> {
		const moments = await this.getStoredMoments()
		const seasonMoments = moments
			.filter((moment) => moment.playerSeasonId === seasonId)
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			)

		const types: GetAllPlayerMomentTypesDTOOutput =
			JSON.parse(localStorage.getItem(this.momentTypesStorageKey) || '[]') ||
			[]
		const typesById = types.reduce(
			(acc, type) => {
				acc[type.id] = type
				return acc
			},
			{} as Record<string, GetAllPlayerMomentTypesDTOOutput[number]>,
		)

		return seasonMoments.map((moment) => {
			const type = typesById[moment.playerMomentTypeId]

			return {
				...moment,
				description: normalizeDescription(moment.description),
				playerMomentTypeName: type?.name ?? 'Outro',
				playerMomentTypeIcon: type?.icon ?? 'Circle',
				playerMomentTypeColor: type?.color ?? '#2563EB',
			}
		})
	}

	private async getStoredMoments(): Promise<Array<StoredPlayerMoment>> {
		const data: Array<StoredPlayerMoment> =
			JSON.parse(localStorage.getItem(this.storageKey) || '[]') || []
		return data
	}
}

export const makePlayerMomentsLocalStorageRepository =
	(): PlayerMomentsLocalStorageRepository => {
		return new PlayerMomentsLocalStorageRepository()
	}
