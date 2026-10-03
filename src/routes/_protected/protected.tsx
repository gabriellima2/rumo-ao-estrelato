import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/protected')({
	component: RouteComponent,
	loader: async ({ context }) => {
		return {
			session: context.session,
		}
	},
})

function RouteComponent() {
	return <Outlet />
}
