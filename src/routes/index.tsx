import { createFileRoute, redirect } from '@tanstack/react-router'

import { getRouteHead } from '@/shared/lib/page-title'

export const Route = createFileRoute('/')({
	head: getRouteHead('Início'),
	beforeLoad: async () => {
		throw redirect({ to: '/login' })
	},
})
