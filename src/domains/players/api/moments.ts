import type { CreateMomentInput } from './types/moments'
import type { PlayerMomentEnriched } from '../types/database'
import { supabase } from '@/integrations/supabase/client'

export async function listMomentsBySeason(
	seasonId: string,
): Promise<PlayerMomentEnriched[]> {
	const { data, error } = await supabase
		.from('player_moments_enriched')
		.select('*')
		.eq('player_season_id', seasonId)
		.order('created_at', { ascending: false })

	if (error) throw error
	return data ?? []
}

export async function listMomentsBySeasonIds(
	seasonIds: string[],
): Promise<PlayerMomentEnriched[]> {
	if (seasonIds.length === 0) return []

	const { data, error } = await supabase
		.from('player_moments_enriched')
		.select('*')
		.in('player_season_id', seasonIds)
		.order('created_at', { ascending: false })

	if (error) throw error
	return data ?? []
}

export async function createMoment(input: CreateMomentInput): Promise<void> {
	const description = input.description?.trim()

	const { error } = await supabase.from('player_moments').insert({
		player_id: input.playerId,
		player_season_id: input.playerSeasonId,
		player_moment_type_id: input.playerMomentTypeId,
		title: input.title,
		description: description || null,
	})

	if (error) throw error
}
