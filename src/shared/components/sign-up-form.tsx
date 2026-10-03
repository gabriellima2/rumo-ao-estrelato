import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { safeNextPath } from '@/lib/safe-next-path'
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

export function SignUpForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setError(null)

		if (password !== repeatPassword) {
			setError('Passwords do not match')
			return
		}
		setIsLoading(true)

		try {
			const next = safeNextPath(
				new URLSearchParams(window.location.search).get('next'),
				'/players',
			)
			const response = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}${next}`,
				},
			})
			if (response.error) throw response.error
			if (response.data.session) {
				window.location.assign(next)
			} else {
				await navigate({ to: '/sign-up-success' })
			}
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
					<CardTitle className="text-2xl">Criar conta</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignUp}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">E-mail</Label>
								<Input
									id="email"
									type="email"
									placeholder="exemplo@email.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Senha</Label>
								</div>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="repeat-password">Repetir senha</Label>
								</div>
								<Input
									id="repeat-password"
									type="password"
									required
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
								/>
							</div>
							{error && <p className="text-sm text-red-500">{error}</p>}
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? 'Criando conta...' : 'Criar conta'}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Já tem uma conta?{' '}
							<Link to="/login" search className="underline underline-offset-4">
								Entrar
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
