import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import z from 'zod'
import { redirectIfAuthenticated } from '@/integrations/supabase/auth-guard'
import { useAuth } from '@/integrations/supabase/auth-context'
import { Button } from '@/shared/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/shared/components/ui/field'
import { TextInput } from '@/shared/components/inputs/text-input'
import { Spinner } from '@/shared/components/ui/spinner'
import { toast } from '@/shared/components/ui/toast'

export const Route = createFileRoute('/login')({
	beforeLoad: redirectIfAuthenticated,
	component: RouteComponent,
})

function RouteComponent() {
	const { navigate } = useRouter()
	const { signIn } = useAuth()

	const { mutateAsync: login } = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			signIn(email, password),
		onSuccess: () => {
			navigate({ to: '/careers' })
		},
		onError: () => {
			toast.add({
				type: 'error',
				title: 'E-mail ou senha inválidos',
			})
		},
	})

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => login(value),
	})

	return (
		<main className="flex h-full flex-col items-center justify-center px-4 py-8">
			<div className="w-full max-w-md space-y-6">
				<header className="space-y-1 text-center">
					<h1 className="text-2xl font-semibold">Entrar</h1>
					<p className="text-muted-foreground text-sm">
						Acesse suas carreiras no Career Mode
					</p>
				</header>

				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
					className="space-y-4"
				>
					<FieldGroup>
						<form.Field
							name="email"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
										<TextInput
											id={field.name}
											name={field.name}
											type="email"
											autoComplete="email"
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="voce@email.com"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						/>
						<form.Field
							name="password"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Senha</FieldLabel>
										<TextInput
											id={field.name}
											name={field.name}
											type="password"
											autoComplete="current-password"
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="Sua senha"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						/>
					</FieldGroup>

					<form.Subscribe
						selector={(state) => [state.isSubmitting]}
						children={([isSubmitting]) => (
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? <Spinner /> : 'Entrar'}
							</Button>
						)}
					/>
				</form>

				<p className="text-muted-foreground text-center text-sm">
					Não tem conta?{' '}
					<Link to="/signup" className="text-foreground underline">
						Criar conta
					</Link>
				</p>
			</div>
		</main>
	)
}

const schema = z.object({
	email: z.string().trim().email('E-mail inválido'),
	password: z.string().min(6, 'Mínimo de 6 caracteres'),
})
