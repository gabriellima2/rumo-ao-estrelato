import type { GetAllPlayersDTOOutput } from '../dtos/get-all-players-dto'
import type { PlayerRepository } from '../repositories/player-repository'

export class GetAllPlayersUseCase {
	constructor(private readonly playerRepository: PlayerRepository) {}

	async execute(): Promise<GetAllPlayersDTOOutput> {
		return await this.playerRepository.getAll()
	}
}

export const makeGetAllPlayersUseCase = (
	playerRepository: PlayerRepository,
): GetAllPlayersUseCase => {
	return new GetAllPlayersUseCase(playerRepository)
}
