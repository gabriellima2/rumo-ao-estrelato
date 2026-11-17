import { Link } from '@tanstack/react-router'
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

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		try {
			const response = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (response.error) throw response.error
			// Follow the `next` query parameter if it is a same-origin relative path, e.g. when
			// the OAuth consent screen sent the user here to sign in first. It may point outside
			// the typed route tree, so it needs a full navigation.
			const next = new URLSearchParams(window.location.search).get('next')
			window.location.assign(safeNextPath(next, '/players'))
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
					<CardTitle className="text-2xl">Entrar</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
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
									<Link
										to="/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Esqueceu sua senha?
									</Link>
								</div>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							{error && <p className="text-sm text-red-500">{error}</p>}
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? 'Entrando...' : 'Entrar'}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Não tem uma conta?{' '}
							<Link
								to="/sign-up"
								search
								className="underline underline-offset-4"
							>
								Criar conta
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
