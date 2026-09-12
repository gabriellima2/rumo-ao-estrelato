import { redirect } from '@tanstack/react-router'
import { supabase } from './client'

export async function requireAuth() {
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		throw redirect({ to: '/login' })
	}
}

export async function redirectIfAuthenticated() {
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		throw redirect({ to: '/players' })
	}
}
