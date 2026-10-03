import type { CreatePlayerCareerInput } from './types/players'
import type { PlayerEnriched } from '../types/database'
import { createClient } from '@/integrations/supabase/client'

export async function listPlayers(): Promise<PlayerEnriched[]> {
	const supabase = createClient()
	const { data, error } = await supabase
		.from('players_enriched')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) throw error
	return data ?? []
}

export async function getPlayerById(
	id: string,
): Promise<PlayerEnriched | undefined> {
	const supabase = createClient()
	const { data, error } = await supabase
		.from('players_enriched')
		.select('*')
		.eq('id', id)
		.maybeSingle()

	if (error) throw error
	return data ?? undefined
}

export async function createPlayerCareer(input: CreatePlayerCareerInput) {
	const supabase = createClient()
	const { data, error } = await supabase.rpc('create_player_career', {
		p_first_name: input.firstName,
		p_last_name: input.lastName,
		p_gender: input.gender,
		p_country_id: input.countryId,
		p_position: input.position,
		p_club_name: input.clubName,
	})

	if (error) throw error

	const row = data?.[0]
	if (!row) throw new Error('Falha ao criar carreira')

	return row
}
