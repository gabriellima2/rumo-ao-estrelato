import { useRouter } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppForm } from './form-hook'
import { finalizeSeasonFormOpts } from './form-options'
import {
	FINALIZE_SEASON_STEP_SCHEMAS,
	finalizeSeasonFormSchema,
} from './schema'
import type { FinalizeSeasonFormValues } from './schema'
import type { MultiStepFormStep } from '@/shared/components/multi-step-form/multi-step-form-context'
import { seasonMutations } from '@/domains/players/queries/seasons'
import { MultiStepForm } from '@/shared/components/multi-step-form/multi-step-form'
import { Input } from '@/shared/components/ui/input'
import { NumberInput } from '@/shared/components/inputs/number-input'
import { TextInput } from '@/shared/components/inputs/text-input'
import { YesNoToggle } from '@/shared/components/inputs/yes-no-toggle'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/shared/components/ui/field'
import { toast } from '@/shared/components/ui/toast'
import {
	toNonNegativeInteger,
	toSeasonAverageRating,
} from '@/shared/utils/converters'
import { averageRatingMask } from '@/shared/utils/masks'

export function FinalizeSeasonForm({
	seasonId,
	currentClubName,
}: {
	seasonId: string
	currentClubName: string
}) {
	const queryClient = useQueryClient()
	const { navigate } = useRouter()

	const { mutateAsync: finalizeSeason, isPending } = useMutation({
		mutationFn: seasonMutations.finalize,
		onSuccess: ({ newSeasonId }) => {
			queryClient.invalidateQueries({ queryKey: ['season-detail'] })
			queryClient.invalidateQueries({ queryKey: ['player-seasons'] })
			queryClient.invalidateQueries({ queryKey: ['player-career-summary'] })

			toast.add({
				type: 'success',
				title: 'Temporada finalizada com sucesso!',
			})

			navigate({
				to: '/players/seasons/$seasonId',
				params: { seasonId: newSeasonId },
			})
		},
		onError: (error) => {
			toast.add({
				type: 'error',
				title:
					error instanceof Error
						? error.message
						: 'Erro ao finalizar temporada',
			})
		},
	})

	function validateCurrentStep(stepId: FinalizeSeasonStepId) {
		const stepValues = pickStepValues(stepId, form.state.values)
		const result = FINALIZE_SEASON_STEP_SCHEMAS[stepId].safeParse(stepValues)

		if (!result.success) {
			const firstError = result.error.issues[0]?.message
			toast.add({
				type: 'error',
				title: firstError ?? 'Verifique os campos do passo atual',
			})

			return false
		}

		return true
	}

	const form = useAppForm({
		...finalizeSeasonFormOpts,
		validators: {
			onSubmit: finalizeSeasonFormSchema,
		},
		onSubmit: async ({ value }) => {
			await finalizeSeason({
				seasonId,
				stats: {
					appearances: toNonNegativeInteger(value.appearances),
					goals: toNonNegativeInteger(value.goals),
					assists: toNonNegativeInteger(value.assists),
					cleanSheets: toNonNegativeInteger(value.cleanSheets),
					yellowCards: toNonNegativeInteger(value.yellowCards),
					redCards: toNonNegativeInteger(value.redCards),
					averageRating: toSeasonAverageRating(value.averageRating),
				},
				achievements: value.achievements.map(
					({ name, achievementType, competitionType }) => ({
						name,
						achievementType,
						competitionType,
					}),
				),
				stayedAtClub: value.stayedAtClub,
				newClubName: value.stayedAtClub ? undefined : value.newClubName,
			})
		},
	})

	return (
		<MultiStepForm.Provider<FinalizeSeasonStepId>
			steps={FINALIZE_SEASON_STEPS}
			validateCurrentStep={validateCurrentStep}
			onSubmit={form.handleSubmit}
		>
			<MultiStepForm.Content>
				<MultiStepForm.Header />

				<MultiStepForm.Step id="stats">
					<FieldGroup className="grid gap-4 sm:grid-cols-2">
						<form.Field
							name="appearances"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Jogos</FieldLabel>
										<NumberInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="0"
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
							name="goals"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Gols</FieldLabel>
										<NumberInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="0"
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
							name="assists"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Assistências</FieldLabel>
										<NumberInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="0"
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
							name="cleanSheets"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Clean sheets</FieldLabel>
										<NumberInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="0"
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
							name="yellowCards"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Cartões amarelos
										</FieldLabel>
										<NumberInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="0"
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
							name="redCards"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Cartões vermelhos
										</FieldLabel>
										<NumberInput
											id={field.name}
											name={field.name}
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={field.handleChange}
											placeholder="0"
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
							name="averageRating"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Nota média</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="text"
											inputMode="decimal"
											isInvalid={isInvalid}
											value={field.state.value}
											onBlur={field.handleBlur}
											onValueChange={(value) =>
												field.handleChange(averageRatingMask(value))
											}
											placeholder="0,0"
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
				</MultiStepForm.Step>

				<MultiStepForm.Step id="achievements">
					<FieldGroup>
						<form.Field
							name="wonAchievements"
							children={(field) => (
								<Field>
									<FieldLabel>Ganhou títulos nesta temporada?</FieldLabel>
									<YesNoToggle
										value={field.state.value}
										onChange={(value) => {
											field.handleChange(value)
											if (!value) {
												form.setFieldValue('achievements', [])
											}
										}}
									/>
								</Field>
							)}
						/>

						<form.Subscribe
							selector={(state) => state.values.wonAchievements}
							children={(wonAchievements) =>
								wonAchievements ? (
									<form.AppForm>
										<form.AppField name="achievements" mode="array">
											{(field) => <field.AchievementsField />}
										</form.AppField>
									</form.AppForm>
								) : null
							}
						/>
					</FieldGroup>
				</MultiStepForm.Step>

				<MultiStepForm.Step id="next-season">
					<FieldGroup>
						<form.Field
							name="stayedAtClub"
							children={(field) => (
								<Field>
									<FieldLabel>
										Você permanece no{' '}
										<span className="font-semibold">{currentClubName}</span>?
									</FieldLabel>
									<YesNoToggle
										value={field.state.value}
										onChange={(value) => {
											field.handleChange(value)
											if (value) {
												form.setFieldValue('newClubName', '')
											}
										}}
									/>
								</Field>
							)}
						/>

						<form.Subscribe
							selector={(state) => state.values.stayedAtClub}
							children={(stayedAtClub) =>
								stayedAtClub ? (
									<p className="text-muted-foreground bg-muted/30 rounded-lg border p-4 text-sm">
										A próxima temporada será criada automaticamente no{' '}
										<span className="text-foreground font-medium">
											{currentClubName}
										</span>
										.
									</p>
								) : (
									<form.Field
										name="newClubName"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>
														Nome do novo clube
													</FieldLabel>
													<TextInput
														id={field.name}
														name={field.name}
														isInvalid={isInvalid}
														value={field.state.value}
														onBlur={field.handleBlur}
														onValueChange={field.handleChange}
														placeholder="Ex: Barcelona"
													/>
													<FieldError
														isInvalid={isInvalid}
														errors={field.state.meta.errors}
													/>
												</Field>
											)
										}}
									/>
								)
							}
						/>
					</FieldGroup>
				</MultiStepForm.Step>
			</MultiStepForm.Content>

			<form.Subscribe
				selector={(state) => [state.isSubmitting]}
				children={([isSubmitting]) => {
					const isLoading = isSubmitting || isPending
					return (
						<MultiStepForm.Footer>
							<MultiStepForm.BackButton isLoading={isLoading} />
							<MultiStepForm.SubmitButton
								submitVariant="destructive"
								submitLabel="Finalizar temporada"
								isLoading={isLoading}
							/>
						</MultiStepForm.Footer>
					)
				}}
			/>
		</MultiStepForm.Provider>
	)
}

type FinalizeSeasonStepId = 'stats' | 'achievements' | 'next-season'

const FINALIZE_SEASON_STEPS: MultiStepFormStep<FinalizeSeasonStepId>[] = [
	{ id: 'stats' },
	{ id: 'achievements' },
	{ id: 'next-season' },
]

function pickStepValues(
	stepId: FinalizeSeasonStepId,
	values: FinalizeSeasonFormValues,
) {
	switch (stepId) {
		case 'stats':
			return {
				appearances: values.appearances,
				goals: values.goals,
				assists: values.assists,
				cleanSheets: values.cleanSheets,
				yellowCards: values.yellowCards,
				redCards: values.redCards,
				averageRating: values.averageRating,
			}
		case 'achievements':
			return {
				wonAchievements: values.wonAchievements,
				achievements: values.achievements,
			}
		case 'next-season':
			return {
				stayedAtClub: values.stayedAtClub,
				newClubName: values.newClubName,
			}
	}
}
