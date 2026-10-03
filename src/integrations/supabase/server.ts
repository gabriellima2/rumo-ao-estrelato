import { createServerClient } from '@supabase/ssr'
import { getCookies, setCookie } from '@tanstack/react-start/server'

export function createClient() {
	const supabaseUrl = process.env.VITE_SUPABASE_URL
	const supabasePublishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

	if (!supabaseUrl || !supabasePublishableKey) {
		throw new Error(
			'Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.',
		)
	}

	return createServerClient(supabaseUrl, supabasePublishableKey, {
		cookies: {
			getAll() {
				return Object.entries(getCookies()).map(([name, value]) => ({
					name,
					value,
				}))
			},
			setAll(cookies) {
				cookies.forEach((cookie) => {
					setCookie(cookie.name, cookie.value)
				})
			},
		},
	})
}
