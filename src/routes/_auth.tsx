import { createFileRoute, redirect } from '@tanstack/react-router'

import { fetchSession } from '@/integrations/supabase/fetch-session'

export const Route = createFileRoute('/_auth')({
	beforeLoad: async () => {
		const session = await fetchSession()

		if (session) {
			throw redirect({
				href: `/players`,
			})
		}
	},
})
