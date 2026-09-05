import { queryOptions } from '@tanstack/react-query'
import {
	finalizeSeason,
	getCareerSummary,
	getSeasonDetail,
	listSeasonsByPlayer,
	transferSeason,
} from '../api/seasons'

export const seasonQueries = {
	byPlayer: (playerId: string) =>
		queryOptions({
			queryKey: ['player-seasons', playerId],
			queryFn: () => listSeasonsByPlayer(playerId),
		}),
	detail: (seasonId: string) =>
		queryOptions({
			queryKey: ['season-detail', seasonId],
			queryFn: () => getSeasonDetail(seasonId),
		}),
	careerSummary: (playerId: string) =>
		queryOptions({
			queryKey: ['player-career-summary', playerId],
			queryFn: () => getCareerSummary(playerId),
		}),
}

export const seasonMutations = {
	finalize: finalizeSeason,
	transfer: transferSeason,
}
