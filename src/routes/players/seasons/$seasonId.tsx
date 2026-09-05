import { Outlet, createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '@/integrations/supabase/auth-guard'

export const Route = createFileRoute('/players/seasons/$seasonId')({
	beforeLoad: requireAuth,
	component: RouteComponent,
})

function RouteComponent() {
	return <Outlet />
}
