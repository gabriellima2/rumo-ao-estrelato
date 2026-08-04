import type { GetAllPlayerMomentTypesDTOOutput } from '../dtos/player-moment-types-dto'

export interface PlayerMomentTypesRepository {
	getAll: () => Promise<GetAllPlayerMomentTypesDTOOutput>
	seedIfEmpty: () => Promise<void>
}
