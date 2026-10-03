import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

export function createClient() {
	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
	const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

	if (!supabaseUrl || !supabasePublishableKey) {
		throw new Error(
			'Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.',
		)
	}

	return createBrowserClient<Database>(supabaseUrl, supabasePublishableKey)
}
