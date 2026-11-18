import { createFileRoute } from '@tanstack/react-router'

import { ForgotPasswordForm } from '@/shared/components/forgot-password-form'
import { getRouteHead } from '@/shared/lib/page-title'

export const Route = createFileRoute('/_auth/forgot-password')({
	head: getRouteHead('Resetar sua senha'),
	component: ForgotPassword,
})

function ForgotPassword() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<ForgotPasswordForm />
			</div>
		</div>
	)
}
