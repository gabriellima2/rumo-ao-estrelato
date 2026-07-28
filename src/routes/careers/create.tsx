import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useMutation } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import type { CountryCode } from '@/shared/catalog/countries'
import type { Gender } from '@/shared/catalog/genders'
import type { PlayerPosition } from '@/domains/player/catalog/positions'
import { Button } from '@/shared/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/shared/components/ui/field'
import { Spinner } from '@/shared/components/ui/spinner'
import { TextInput } from '@/shared/components/inputs/text-input'
import {
	EMPTY_SEARCHABLE_SELECT_OPTION,
	searchableSelectSchema,
} from '@/shared/catalog/select'
import { isEmptyString } from '@/shared/utils/validators'
import { toast } from '@/shared/components/ui/toast'
import { CountrySelect } from '@/shared/components/selects/country-select'
import { GenderSelect } from '@/shared/components/selects/gender-select'
import { PlayerPositionSelect } from '@/domains/player/components/player-position-select'
import { usePlayerUseCases } from '@/domains/player/contexts/player-use-cases-context'

export const Route = createFileRoute('/careers/create')({
	component: RouteComponent,
})
function RouteComponent() {
	const { navigate } = useRouter()
	const { createPlayer: createPlayerUseCase } = usePlayerUseCases()

	const { mutateAsync: createPlayer } = useMutation({
		mutationFn: createPlayerUseCase,
		onSuccess: () => {
			toast.add({
				type: 'success',
				title: 'Carreira adicionada com sucesso!',
			})
			navigate({ to: '/careers' })
		},
		onError: () => {
			toast.add({
				type: 'error',
				title: 'Erro ao adicionar carreira',
			})
		},
	})

	const form = useForm({
		defaultValues: {
			gender: '',
			firstName: '',
			lastName: '',
			country: EMPTY_SEARCHABLE_SELECT_OPTION,
			position: '',
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) =>
			createPlayer({
				gender: value.gender as Gender,
				firstName: value.firstName,
				lastName: value.lastName,
				country: value.country.value as CountryCode,
				position: value.position as PlayerPosition,
			}),
	})

	return (
		<main className="flex h-full flex-col items-center px-4 py-8">
			<div className="w-full max-w-2xl space-y-4">
				<header className="flex flex-row items-center gap-2">
					<Button
						variant="ghost"
						title="Voltar"
						nativeButton={false}
						render={
							<Link to="/careers">
								<ChevronLeft />
							</Link>
						}
					/>

					<h1 className="text-lg font-medium">Criar carreira</h1>
				</header>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
					className="flex flex-col items-end gap-4"
				>
					<FieldGroup>
						<form.Field
							name="gender"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Gênero</FieldLabel>
										<GenderSelect
											id={field.name}
											name={field.name}
											aria-invalid={isInvalid}
											value={field.state.value}
											onValueChange={field.handleChange}
											onBlur={field.handleBlur}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						/>
						<form.Field
							name="firstName"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Nome</FieldLabel>
										<TextInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="Ex: João"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						/>
						<form.Field
							name="lastName"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Sobrenome</FieldLabel>
										<TextInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="Ex: Silva"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						/>
						<form.Field
							name="country"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>País</FieldLabel>
										<CountrySelect
											id={field.name}
											name={field.name}
											aria-invalid={isInvalid}
											value={field.state.value}
											onValueChange={field.handleChange}
											onBlur={field.handleBlur}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						/>
						<form.Field
							name="position"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Posição</FieldLabel>
										<PlayerPositionSelect
											id={field.name}
											name={field.name}
											aria-invalid={isInvalid}
											value={field.state.value}
											onValueChange={field.handleChange}
											onBlur={field.handleBlur}
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
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? <Spinner /> : 'Criar carreira'}
							</Button>
						)}
					/>
				</form>
			</div>
		</main>
	)
}

const schema = z.object({
	gender: z.string().trim().nonempty('Obrigatório'),
	firstName: z
		.string()
		.trim()
		.nonempty('Obrigatório')
		.max(50, 'Máximo de 50 caracteres'),
	lastName: z
		.string()
		.trim()
		.nonempty('Obrigatório')
		.max(50, 'Máximo de 50 caracteres'),
	country: searchableSelectSchema.refine(
		({ value }) => !isEmptyString(value),
		'Obrigatório',
	),
	position: z.string().trim().nonempty('Obrigatório'),
})
