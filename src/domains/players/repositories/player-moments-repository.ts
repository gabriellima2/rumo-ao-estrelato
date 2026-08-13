import type {
	CreatePlayerMomentDTOInput,
	GetPlayerMomentsBySeasonIdDTOOutput,
} from '../dtos/player-moments-dto'

export interface PlayerMomentsRepository {
	create: (input: CreatePlayerMomentDTOInput) => Promise<void>
	getAllBySeasonId: (
		seasonId: string,
	) => Promise<GetPlayerMomentsBySeasonIdDTOOutput>
	getAllBySeasonIds: (
		seasonIds: string[],
	) => Promise<GetPlayerMomentsBySeasonIdDTOOutput>
}
