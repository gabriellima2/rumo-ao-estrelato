import type { PlayerMomentType } from '../types/database'
import { createClient } from '@/integrations/supabase/client'

export async function listMomentTypes(): Promise<PlayerMomentType[]> {
	const supabase = createClient()
	const { data, error } = await supabase
		.from('player_moment_types')
		.select('id, name, icon, color, is_system, is_selectable')
		.order('name')

	if (error) throw error
	return data ?? []
}

export async function listSelectableMomentTypes(): Promise<PlayerMomentType[]> {
	const supabase = createClient()
	const { data, error } = await supabase
		.from('player_moment_types')
		.select('id, name, icon, color, is_system, is_selectable')
		.eq('is_selectable', true)
		.order('name')

	if (error) throw error
	return data ?? []
}
