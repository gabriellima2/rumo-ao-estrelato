import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { createClient } from '@/integrations/supabase/client'

export function UpdatePasswordForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		try {
			const response = await supabase.auth.updateUser({ password })
			if (response.error) throw response.error
			// Update this route to redirect to an authenticated route. The user already has an active session.
			await navigate({ to: '/players' })
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Resetar sua senha</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleForgotPassword}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="password">Nova senha</Label>
								<Input
									id="password"
									type="password"
									placeholder="Nova senha"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							{error && <p className="text-sm text-red-500">{error}</p>}
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? 'Salvando...' : 'Salvar nova senha'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
