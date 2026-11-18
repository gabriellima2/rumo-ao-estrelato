import { createFileRoute } from '@tanstack/react-router'

import { LoginForm } from '@/shared/components/login-form'
import { getRouteHead } from '@/shared/lib/page-title'

export const Route = createFileRoute('/_auth/login')({
	head: getRouteHead('Entrar'),
	component: Login,
})

function Login() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	)
}
