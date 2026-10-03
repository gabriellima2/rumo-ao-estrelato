'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { toast } from '../ui/toast'
import { createClient } from '@/integrations/supabase/client'

type SignOutButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	'isLoading' | 'onClick' | 'children'
>

export function SignOutButton(props: SignOutButtonProps) {
	const { navigate } = useRouter()

	function signOutFn() {
		const supabase = createClient()
		return supabase.auth.signOut()
	}

	const { mutateAsync: signOut, isPending } = useMutation({
		mutationFn: signOutFn,
		onSuccess: () => {
			navigate({ to: '/login' })
		},
		onError: () => {
			toast.add({
				type: 'error',
				title: 'Erro ao sair',
			})
		},
	})

	return (
		<Button
			title="Sair"
			variant="ghost"
			onClick={() => signOut()}
			isLoading={isPending}
			{...props}
		>
			<LogOutIcon aria-hidden />
		</Button>
	)
}
