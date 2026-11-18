import { createFileRoute } from '@tanstack/react-router'

import { UpdatePasswordForm } from '@/shared/components/update-password-form'
import { getRouteHead } from '@/shared/lib/page-title'

export const Route = createFileRoute('/_auth/update-password')({
	head: getRouteHead('Atualizar senha'),
	component: UpdatePassword,
})

function UpdatePassword() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<UpdatePasswordForm />
			</div>
		</div>
	)
}
