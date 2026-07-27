import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
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
import { COUNTRIES_SELECT_OPTIONS } from '@/shared/catalog/countries'
import { CommonSelect } from '@/shared/components/selects/common-select'
import { GENDER_SELECT_OPTIONS } from '@/shared/catalog/genders'
import { SearchableSelect } from '@/shared/components/selects/searchable-select'
import {
	EMPTY_SEARCHABLE_SELECT_OPTION,
	searchableSelectSchema,
} from '@/shared/catalog/select'
import { isEmptyString } from '@/shared/utils/validators'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { PLAYER_POSITION_SELECT_OPTIONS } from '@/domains/player/catalog/positions'
import { makeCreatePlayerUseCase } from '@/domains/player/use-cases/create-player-use-case'
import { makePlayerLocalStorageRepository } from '@/domains/player/repositories/local-storage/player-local-storage-repository'

export const Route = createFileRoute('/create-career')({
	component: RouteComponent,
})

const createPlayerUseCase = makeCreatePlayerUseCase(
	makePlayerLocalStorageRepository(),
)

function RouteComponent() {
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
			createPlayerUseCase.execute({
				gender: value.gender as Gender,
				firstName: value.firstName,
				lastName: value.lastName,
				country: value.country.value as CountryCode,
				position: value.position as PlayerPosition,
			}),
	})

	return (
		<main className="flex h-full flex-col items-center justify-center">
			<Card className="w-full max-w-xl">
				<CardHeader>
					<CardTitle>Criar carreira</CardTitle>
					<CardDescription>
						Preencha os dados abaixo para criar sua carreira jogador
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							e.stopPropagation()
							form.handleSubmit()
						}}
						className="flex flex-col items-end gap-(--card-spacing)"
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
											<CommonSelect
												id={field.name}
												name={field.name}
												aria-invalid={isInvalid}
												value={field.state.value}
												options={GENDER_SELECT_OPTIONS}
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
											<SearchableSelect
												id={field.name}
												name={field.name}
												aria-invalid={isInvalid}
												value={field.state.value}
												options={COUNTRIES_SELECT_OPTIONS}
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
											<CommonSelect
												id={field.name}
												name={field.name}
												aria-invalid={isInvalid}
												value={field.state.value}
												options={PLAYER_POSITION_SELECT_OPTIONS}
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
				</CardContent>
			</Card>
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
