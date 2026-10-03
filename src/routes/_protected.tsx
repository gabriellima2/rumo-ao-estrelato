import { createFileRoute, redirect } from '@tanstack/react-router'

import { fetchSession } from '@/integrations/supabase/fetch-session'

export const Route = createFileRoute('/_protected')({
	beforeLoad: async ({ location }) => {
		const session = await fetchSession()

		if (!session) {
			throw redirect({
				href: `/login?next=${encodeURIComponent(location.href)}`,
			})
		}

		return {
			session,
		}
	},
})
