import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
	console.warn(
		'Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.',
	)
}

export const supabase = createClient<Database>(
	supabaseUrl ?? '',
	supabasePublishableKey ?? '',
)

export function throwIfSupabaseError<T>(
	result: { data: T; error: { message: string } | null },
	field = 'Operação',
): T {
	if (result.error) {
		throw new Error(result.error.message || `${field} falhou`)
	}

	return result.data
}
