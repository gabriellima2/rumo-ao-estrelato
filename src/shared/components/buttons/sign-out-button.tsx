'use client'

import { LogOutIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useAuth } from '@/integrations/supabase/auth-context'

type SignOutButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	'onClick' | 'children'
>

export function SignOutButton(props: SignOutButtonProps) {
	const { signOut } = useAuth()

	return (
		<Button title="Sair" variant="ghost" onClick={signOut} {...props}>
			<LogOutIcon aria-hidden />
		</Button>
	)
}
