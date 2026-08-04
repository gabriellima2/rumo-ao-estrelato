import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import z from 'zod'
import { usePlayerMomentsUseCases } from '../contexts/player-moments-use-cases-context'
import { PlayerMomentTypePicker } from './player-moment-type-picker'
import { PlayerMomentCard } from './player-moment-card'
import type { GetPlayerMomentsBySeasonIdDTOOutput } from '../dtos/player-moments-dto'
import type { GetAllPlayerMomentTypesDTOOutput } from '../dtos/player-moment-types-dto'
import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/shared/components/ui/field'
import { TextInput } from '@/shared/components/inputs/text-input'
import { Textarea } from '@/shared/components/ui/textarea'
import { Spinner } from '@/shared/components/ui/spinner'
import { toast } from '@/shared/components/ui/toast'

type SeasonMomentsSectionProps = {
	playerId: string
	seasonId: string
	momentTypes: GetAllPlayerMomentTypesDTOOutput
	moments: GetPlayerMomentsBySeasonIdDTOOutput
}

export function SeasonMomentsSection({
	playerId,
	seasonId,
	momentTypes,
	moments,
}: SeasonMomentsSectionProps) {
	const queryClient = useQueryClient()
	const { createPlayerMoment } = usePlayerMomentsUseCases()

	const defaultTypeId = momentTypes[0]?.id ?? ''

	const { mutateAsync: createMoment } = useMutation({
		mutationFn: createPlayerMoment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['player-moments', seasonId] })
			toast.add({
				type: 'success',
				title: 'Momento registrado!',
			})
		},
		onError: () => {
			toast.add({
				type: 'error',
				title: 'Erro ao registrar momento',
			})
		},
	})

	const form = useForm({
		defaultValues: {
			playerMomentTypeId: defaultTypeId,
			title: '',
			description: '',
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: async ({ value }) => {
			const description = value.description.trim()

			await createMoment({
				playerId,
				playerSeasonId: seasonId,
				title: value.title,
				...(description ? { description } : {}),
				playerMomentTypeId: value.playerMomentTypeId,
			})
			form.reset()
			form.setFieldValue('playerMomentTypeId', defaultTypeId)
		},
	})

	return (
		<section className="space-y-4">
			<h2 className="text-xl font-semibold">Momentos</h2>

			<Card>
				<CardHeader>
					<CardTitle className="text-base">Registrar momento</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							e.stopPropagation()
							form.handleSubmit()
						}}
						className="flex flex-col gap-4"
					>
						<FieldGroup>
							<form.Field
								name="playerMomentTypeId"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel>Tipo</FieldLabel>
											<PlayerMomentTypePicker
												types={momentTypes}
												value={field.state.value}
												onChange={field.handleChange}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>
							<form.Field
								name="title"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Título</FieldLabel>
											<TextInput
												id={field.name}
												name={field.name}
												isInvalid={isInvalid}
												value={field.state.value}
												onBlur={field.handleBlur}
												onValueChange={field.handleChange}
												placeholder="Ex: Hat-trick no clássico"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>
							<form.Field
								name="description"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>
												Descrição{' '}
												<span className="font-normal text-muted-foreground">
													(opcional)
												</span>
											</FieldLabel>
											<Textarea
												id={field.name}
												name={field.name}
												aria-invalid={isInvalid}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Conte o que aconteceu..."
												rows={3}
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
								<Button type="submit" disabled={isSubmitting} className="w-full">
									{isSubmitting ? <Spinner /> : 'Salvar momento'}
								</Button>
							)}
						/>
					</form>
				</CardContent>
			</Card>

			{moments.length >= 1 ? (
				<ul className="space-y-3">
					{moments.map((moment) => (
						<li key={moment.id}>
							<PlayerMomentCard moment={moment} />
						</li>
					))}
				</ul>
			) : (
				<p className="py-4 text-center text-sm text-muted-foreground">
					Nenhum momento registrado ainda.
				</p>
			)}
		</section>
	)
}

const schema = z.object({
	playerMomentTypeId: z.string().trim().nonempty('Obrigatório'),
	title: z
		.string()
		.trim()
		.nonempty('Obrigatório')
		.max(80, 'Máximo de 80 caracteres'),
	description: z
		.string()
		.trim()
		.max(500, 'Máximo de 500 caracteres')
})
