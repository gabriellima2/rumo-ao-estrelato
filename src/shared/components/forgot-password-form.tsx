import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { createClient } from '@/integrations/supabase/client'

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [email, setEmail] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		try {
			// The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
			const response = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: 'http://localhost:3000/update-password',
			})
			if (response.error) throw response.error
			setSuccess(true)
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			{success ? (
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Verifique seu e-mail</CardTitle>
						<CardDescription>
							Instruções para resetar sua senha enviadas
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground text-sm">
							Se você registrou usando seu e-mail e senha, você receberá um
							e-mail para resetar sua senha.
						</p>
					</CardContent>
				</Card>
			) : (
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Resetar sua senha</CardTitle>
						<CardDescription>
							Digite seu e-mail e nós lhe enviaremos um link para resetar sua
							senha
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleForgotPassword}>
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
								{error && <p className="text-sm text-red-500">{error}</p>}
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? 'Enviando...' : 'Enviar e-mail de reset'}
								</Button>
							</div>
							<div className="mt-4 text-center text-sm">
								Já tem uma conta?{' '}
								<Link to="/login" className="underline underline-offset-4">
									Entrar
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
