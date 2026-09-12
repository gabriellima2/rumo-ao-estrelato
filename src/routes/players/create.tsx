import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useMutation } from '@tanstack/react-query'
import { SaveIcon } from 'lucide-react'
import type { Gender } from '@/shared/catalog/genders'
import type { PlayerPosition } from '@/domains/players/catalog/positions'
import { requireAuth } from '@/integrations/supabase/auth-guard'
import { Button } from '@/shared/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/shared/components/ui/field'
import { TextInput } from '@/shared/components/inputs/text-input'
import {
	EMPTY_SEARCHABLE_SELECT_OPTION,
	searchableSelectSchema,
} from '@/shared/catalog/select'
import { isEmptyString } from '@/shared/utils/validators'
import { toast } from '@/shared/components/ui/toast'
import { CountrySelect } from '@/shared/components/selects/country-select'
import { GenderSelect } from '@/shared/components/selects/gender-select'
import { PlayerPositionSelect } from '@/domains/players/components/player-position-select'
import { playerMutations } from '@/domains/players/queries/players'
import { Shell, ShellContent } from '@/shared/components/dashboard/shell'
import {
	Header,
	HeaderStart,
	HeaderTitle,
} from '@/shared/components/dashboard/header'
import { BackButton } from '@/shared/components/buttons/back-button'
import { Form } from '@/shared/components/ui/form'
import { VALIDATION_MESSAGES } from '@/shared/validation-messages'
import {
	PLAYER_CLUB_VALIDATIONS,
	PLAYER_VALIDATIONS,
} from '@/domains/players/validations'

export const Route = createFileRoute('/players/create')({
	beforeLoad: requireAuth,
	component: RouteComponent,
})

function RouteComponent() {
	const { navigate } = useRouter()
	const { mutateAsync: createPlayer } = useMutation({
		mutationFn: playerMutations.create,
		onSuccess: () => {
			toast.add({
				type: 'success',
				title: 'Jogador adicionado com sucesso!',
			})
			navigate({ to: '/players' })
		},
		onError: () => {
			toast.add({
				type: 'error',
				title: 'Erro ao adicionar jogador',
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
			clubName: '',
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) =>
			createPlayer({
				gender: value.gender as Gender,
				firstName: value.firstName,
				lastName: value.lastName,
				countryId: value.country.value,
				position: value.position as PlayerPosition,
				clubName: value.clubName,
			}),
	})

	return (
		<Shell>
			<ShellContent>
				<Header>
					<HeaderStart>
						<BackButton to="/players" />
						<HeaderTitle>Adicionar jogador</HeaderTitle>
					</HeaderStart>
				</Header>
				<Form onSubmit={form.handleSubmit}>
					<FieldGroup>
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
										<FieldError
											isInvalid={isInvalid}
											errors={field.state.meta.errors}
										/>
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
										<FieldError
											isInvalid={isInvalid}
											errors={field.state.meta.errors}
										/>
									</Field>
								)
							}}
						/>
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
										<FieldError
											isInvalid={isInvalid}
											errors={field.state.meta.errors}
										/>
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
										<FieldError
											isInvalid={isInvalid}
											errors={field.state.meta.errors}
										/>
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
										<FieldError
											isInvalid={isInvalid}
											errors={field.state.meta.errors}
										/>
									</Field>
								)
							}}
						/>
						<form.Field
							name="clubName"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Clube</FieldLabel>
										<TextInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="Ex: Santos"
										/>
										<FieldError
											isInvalid={isInvalid}
											errors={field.state.meta.errors}
										/>
									</Field>
								)
							}}
						/>
					</FieldGroup>
					<form.Subscribe
						selector={(state) => [state.isSubmitting]}
						children={([isSubmitting]) => (
							<Button
								type="submit"
								isLoading={isSubmitting}
								leftIcon={<SaveIcon aria-hidden />}
							>
								Salvar
							</Button>
						)}
					/>
				</Form>
			</ShellContent>
		</Shell>
	)
}

const schema = z.object({
	gender: z.string().trim().nonempty(VALIDATION_MESSAGES.required),
	firstName: z
		.string()
		.trim()
		.nonempty(VALIDATION_MESSAGES.required)
		.max(
			PLAYER_VALIDATIONS.firstName.maxLength,
			VALIDATION_MESSAGES.maxLength(PLAYER_VALIDATIONS.firstName.maxLength),
		),
	lastName: z
		.string()
		.trim()
		.nonempty(VALIDATION_MESSAGES.required)
		.max(
			PLAYER_VALIDATIONS.lastName.maxLength,
			VALIDATION_MESSAGES.maxLength(PLAYER_VALIDATIONS.lastName.maxLength),
		),
	country: searchableSelectSchema.refine(
		({ value }) => !isEmptyString(value),
		VALIDATION_MESSAGES.required,
	),
	position: z.string().trim().nonempty(VALIDATION_MESSAGES.required),
	clubName: z
		.string()
		.trim()
		.nonempty(VALIDATION_MESSAGES.required)
		.min(
			PLAYER_CLUB_VALIDATIONS.name.minLength,
			VALIDATION_MESSAGES.minLength(PLAYER_CLUB_VALIDATIONS.name.minLength),
		)
		.max(
			PLAYER_CLUB_VALIDATIONS.name.maxLength,
			VALIDATION_MESSAGES.maxLength(PLAYER_CLUB_VALIDATIONS.name.maxLength),
		),
})
