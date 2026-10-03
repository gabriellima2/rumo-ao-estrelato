import { createServerFn } from '@tanstack/react-start'
import { createClient } from './server'

export const fetchSession: () => Promise<{ id: string } | null> =
	createServerFn({
		method: 'GET',
	}).handler(async () => {
		const supabase = createClient()
		const { data, error } = await supabase.auth.getClaims()

		if (error || !data) {
			return null
		}

		return { id: data?.claims.sub }
	})
