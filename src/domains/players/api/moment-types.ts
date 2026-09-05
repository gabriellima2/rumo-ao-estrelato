import type { PlayerMomentType } from '../types/database'
import { supabase } from '@/integrations/supabase/client'

export async function listMomentTypes(): Promise<PlayerMomentType[]> {
	const { data, error } = await supabase
		.from('player_moment_types')
		.select('id, name, icon, color, is_system')
		.order('name')

	if (error) throw error
	return data ?? []
}
