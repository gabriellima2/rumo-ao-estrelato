import type { CountryOption } from '../types/database'
import { supabase } from '@/integrations/supabase/client'

export async function listCountriesOptions(): Promise<CountryOption[]> {
	const { data, error } = await supabase
		.from('countries')
		.select('id, code, name')
		.order('name')

	if (error) throw error
	return data ?? []
}
