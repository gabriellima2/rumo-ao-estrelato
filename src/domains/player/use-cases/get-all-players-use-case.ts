import type { GetAllPlayersDTOOutput } from '../dtos/get-all-players-dto'
import type { PlayerRepository } from '../repositories/player-repository'

export class GetAllPlayersUseCase {
	constructor(private readonly playerRepository: PlayerRepository) {}

	async execute(): Promise<GetAllPlayersDTOOutput> {
		try {
			return await this.playerRepository.getAll()
		} catch (error) {
			console.error('Error fetching players:', error)
			throw new Error('Error fetching players')
		}
	}
}

export const makeGetAllPlayersUseCase = (
	playerRepository: PlayerRepository,
): GetAllPlayersUseCase => {
	return new GetAllPlayersUseCase(playerRepository)
}
