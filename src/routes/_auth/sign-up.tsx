import { createFileRoute } from '@tanstack/react-router'

import { SignUpForm } from '@/shared/components/sign-up-form'
import { getRouteHead } from '@/shared/lib/page-title'

export const Route = createFileRoute('/_auth/sign-up')({
	head: getRouteHead('Criar conta'),
	component: SignUp,
})

function SignUp() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignUpForm />
			</div>
		</div>
	)
}
