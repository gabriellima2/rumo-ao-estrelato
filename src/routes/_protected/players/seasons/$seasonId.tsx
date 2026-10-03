import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/players/seasons/$seasonId')({
	component: RouteComponent,
})

function RouteComponent() {
	return <Outlet />
}
