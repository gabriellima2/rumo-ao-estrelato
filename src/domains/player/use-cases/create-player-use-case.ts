import type { CreatePlayerDTOInput } from '../dtos/create-player-dto'
import type { PlayerRepository } from '../repositories/player-repository'

export class CreatePlayerUseCase {
	constructor(private readonly playerRepository: PlayerRepository) {}

	async execute(input: CreatePlayerDTOInput): Promise<void> {
		try {
			await this.playerRepository.create({
				country: input.country,
				firstName: input.firstName,
				lastName: input.lastName,
				gender: input.gender,
				position: input.position,
			})
		} catch (error) {
			console.error('Error creating player:', error)
		}
	}
}

export const makeCreatePlayerUseCase = (
	playerRepository: PlayerRepository,
): CreatePlayerUseCase => {
	return new CreatePlayerUseCase(playerRepository)
}
