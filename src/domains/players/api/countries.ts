import type { CountryOption } from '../types/database'
import { createClient } from '@/integrations/supabase/client'

export async function listCountriesOptions(): Promise<CountryOption[]> {
	const supabase = createClient()
	const { data, error } = await supabase
		.from('countries')
		.select('id, code, name')
		.order('name')

	if (error) throw error
	return data ?? []
}
