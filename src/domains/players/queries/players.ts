import { queryOptions } from '@tanstack/react-query'
import { createPlayerCareer, getPlayerById, listPlayers } from '../api/players'

export const playerQueries = {
	all: () =>
		queryOptions({
			queryKey: ['players'],
			queryFn: listPlayers,
		}),
	byId: (id: string) =>
		queryOptions({
			queryKey: ['players', id],
			queryFn: () => getPlayerById(id),
		}),
}

export const playerMutations = {
	create: createPlayerCareer,
}
