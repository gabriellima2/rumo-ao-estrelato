import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, X } from 'lucide-react'
import type { AchievementType } from '@/domains/players/catalog/achievement-types'
import type { CompetitionType } from '@/domains/players/catalog/competition-types'
import {
	ACHIEVEMENT_TYPE_LABELS,
	AchievementTypes,
} from '@/domains/players/catalog/achievement-types'
import {
	COMPETITION_TYPE_LABELS,
	CompetitionTypes,
} from '@/domains/players/catalog/competition-types'
import {
	seasonMutations,
	seasonQueries,
} from '@/domains/players/queries/seasons'
import { MultiStepForm } from '@/shared/components/multi-step-form/multi-step-form'
import { MultiStepFormContext } from '@/shared/components/multi-step-form/multi-step-form-context'
import { useMultiStepForm } from '@/shared/components/multi-step-form/use-multi-step-form'
import { NumberInput } from '@/shared/components/inputs/number-input'
import { TextInput } from '@/shared/components/inputs/text-input'
import { YesNoToggle } from '@/shared/components/inputs/yes-no-toggle'
import { Button } from '@/shared/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/shared/components/ui/field'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Spinner } from '@/shared/components/ui/spinner'
import { toast } from '@/shared/components/ui/toast'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/players/seasons/$seasonId/transfer')({
	component: RouteComponent,
})

const TRANSFER_SEASON_STEPS = [
	{ id: 'stats' },
	{ id: 'achievements' },
	{ id: 'new-club' },
] as const

type TransferSeasonStepId = (typeof TRANSFER_SEASON_STEPS)[number]['id']

type AchievementFormValue = {
	id: string
	name: string
	achievementType: AchievementType
	competitionType: CompetitionType | null
}

const STAT_FIELDS = [
	{ name: 'appearances' as const, label: 'Jogos' },
	{ name: 'goals' as const, label: 'Gols' },
	{ name: 'assists' as const, label: 'Assistências' },
	{ name: 'cleanSheets' as const, label: 'Clean sheets' },
	{ name: 'yellowCards' as const, label: 'Cartões amarelos' },
	{ name: 'redCards' as const, label: 'Cartões vermelhos' },
	{ name: 'averageRating' as const, label: 'Nota média' },
]

const COMPETITION_PRESETS = Object.values(CompetitionTypes).map((type) => ({
	type,
	label: COMPETITION_TYPE_LABELS[type],
}))

function createAchievement(
	name: string,
	achievementType: AchievementType,
	competitionType: CompetitionType | null,
): AchievementFormValue {
	return {
		id: Math.random().toString(),
		name,
		achievementType,
		competitionType,
	}
}

function RouteComponent() {
	const { seasonId } = Route.useParams()
	const { navigate } = useRouter()
	const queryClient = useQueryClient()
	const stepState = useMultiStepForm({ steps: TRANSFER_SEASON_STEPS })

	const { data: seasonDetail, isLoading } = useQuery({
		...seasonQueries.detail(seasonId),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	const { mutateAsync: transferSeason, isPending } = useMutation({
		mutationFn: seasonMutations.transfer,
		onSuccess: ({ newSeasonId }) => {
			queryClient.invalidateQueries({ queryKey: ['season-detail'] })
			queryClient.invalidateQueries({ queryKey: ['player-seasons'] })
			queryClient.invalidateQueries({ queryKey: ['player-career-summary'] })
			queryClient.invalidateQueries({ queryKey: ['player-moments'] })

			toast.add({
				type: 'success',
				title: 'Transferência registrada com sucesso!',
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
						: 'Erro ao registrar transferência',
			})
		},
	})

	const form = useForm({
		defaultValues: {
			appearances: 0,
			goals: 0,
			assists: 0,
			cleanSheets: 0,
			yellowCards: 0,
			redCards: 0,
			averageRating: 0,
			wonAchievements: false,
			achievements: [] as AchievementFormValue[],
			newClubName: '',
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: async ({ value }) => {
			if (!seasonDetail) return

			await transferSeason({
				seasonId: seasonDetail.season.currentSeasonId,
				stats: {
					appearances: value.appearances,
					goals: value.goals,
					assists: value.assists,
					cleanSheets: value.cleanSheets,
					yellowCards: value.yellowCards,
					redCards: value.redCards,
					averageRating: value.averageRating,
				},
				achievements: value.achievements.map(
					({ name, achievementType, competitionType }) => ({
						name,
						achievementType,
						competitionType,
					}),
				),
				newClubName: value.newClubName,
			})
		},
	})

	const validateCurrentStep = () => {
		const stepId = stepState.currentStep.id as TransferSeasonStepId
		const stepValues = pickStepValues(stepId, form.state.values)
		const result = STEP_SCHEMAS[stepId].safeParse(stepValues)

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

	const handleNext = () => {
		if (validateCurrentStep()) {
			stepState.goNext()
		}
	}

	const handleSubmit = () => {
		if (!validateCurrentStep()) return
		form.handleSubmit()
	}

	if (!isLoading && (!seasonDetail || !seasonDetail.season.isCurrent)) {
		return (
			<main className="flex h-full flex-col items-center px-4 py-8">
				<div className="w-full max-w-2xl space-y-4">
					<header className="flex flex-row items-center gap-4">
						<Button
							title="Voltar"
							variant="outline"
							nativeButton={false}
							render={
								<Link to="/players/seasons/$seasonId" params={{ seasonId }}>
									<ArrowLeft />
								</Link>
							}
						/>
						<h1 className="text-lg font-medium">
							Esta temporada não pode receber transferência
						</h1>
					</header>
				</div>
			</main>
		)
	}

	return (
		<main className="flex h-full flex-col items-center px-4 py-8">
			<div className="w-full max-w-2xl space-y-4">
				<header className="flex flex-row items-center gap-4">
					<Button
						title="Voltar"
						variant="outline"
						nativeButton={false}
						render={
							<Link to="/players/seasons/$seasonId" params={{ seasonId }}>
								<ArrowLeft />
							</Link>
						}
					/>
					<h1 className="text-lg font-medium">Registrar transferência</h1>
				</header>

				{isLoading || !seasonDetail ? (
					<div className="space-y-4">
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-48 w-full" />
					</div>
				) : (
					<MultiStepFormContext.Provider value={stepState}>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								e.stopPropagation()
								handleSubmit()
							}}
							className="flex flex-col items-end gap-4"
						>
							<div className="w-full space-y-6">
								<MultiStepForm.Header />

								<MultiStepForm.Step id="stats">
									<p className="text-muted-foreground mb-4 text-sm">
										Registre as estatísticas pelo{' '}
										<span className="text-foreground font-medium">
											{seasonDetail.club.name}
										</span>{' '}
										antes da transferência.
									</p>
									<FieldGroup className="grid gap-4 sm:grid-cols-2">
										{STAT_FIELDS.map(({ name, label }) => (
											<form.Field
												key={name}
												name={name}
												children={(field) => {
													const isInvalid =
														field.state.meta.isTouched &&
														!field.state.meta.isValid
													return (
														<Field data-invalid={isInvalid}>
															<FieldLabel htmlFor={field.name}>
																{label}
															</FieldLabel>
															<NumberInput
																id={field.name}
																name={field.name}
																isInvalid={isInvalid}
																value={String(field.state.value)}
																onBlur={field.handleBlur}
																onValueChange={(value) =>
																	field.handleChange(Number(value) || 0)
																}
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
										))}
									</FieldGroup>
								</MultiStepForm.Step>

								<MultiStepForm.Step id="achievements">
									<FieldGroup>
										<form.Field
											name="wonAchievements"
											children={(field) => (
												<Field>
													<FieldLabel>Ganhou títulos neste clube?</FieldLabel>
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
													<div className="space-y-4">
														<div className="flex flex-wrap gap-2">
															{COMPETITION_PRESETS.map(({ type, label }) => (
																<button
																	key={type}
																	type="button"
																	onClick={() => {
																		const current =
																			form.getFieldValue('achievements')
																		form.setFieldValue('achievements', [
																			...current,
																			createAchievement(
																				label,
																				AchievementTypes.Competition,
																				type,
																			),
																		])
																	}}
																	className={cn(
																		'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
																		'border-border hover:border-primary hover:bg-primary/5',
																	)}
																>
																	{label}
																</button>
															))}
															<button
																type="button"
																onClick={() => {
																	const current =
																		form.getFieldValue('achievements')
																	form.setFieldValue('achievements', [
																		...current,
																		createAchievement(
																			ACHIEVEMENT_TYPE_LABELS[
																				AchievementTypes.IndividualAward
																			],
																			AchievementTypes.IndividualAward,
																			null,
																		),
																	])
																}}
																className={cn(
																	'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
																	'border-border hover:border-primary hover:bg-primary/5',
																)}
															>
																{
																	ACHIEVEMENT_TYPE_LABELS[
																		AchievementTypes.IndividualAward
																	]
																}
															</button>
														</div>

														<form.Field
															name="achievements"
															children={(field) =>
																field.state.value.length > 0 ? (
																	<ul className="space-y-2">
																		{field.state.value.map(
																			(achievement, index) => (
																				<li
																					key={achievement.id}
																					className="flex items-center gap-2 rounded-lg border p-2"
																				>
																					<TextInput
																						value={achievement.name}
																						onValueChange={(name) => {
																							const updated = [
																								...field.state.value,
																							]
																							updated[index] = {
																								...achievement,
																								name,
																							}
																							field.handleChange(updated)
																						}}
																						className="flex-1"
																					/>
																					<Button
																						type="button"
																						variant="ghost"
																						size="icon-sm"
																						title="Remover"
																						onClick={() => {
																							field.handleChange(
																								field.state.value.filter(
																									(item) =>
																										item.id !== achievement.id,
																								),
																							)
																						}}
																					>
																						<X />
																					</Button>
																				</li>
																			),
																		)}
																	</ul>
																) : (
																	<p className="text-muted-foreground text-sm">
																		Nenhum título adicionado ainda.
																	</p>
																)
															}
														/>
													</div>
												) : null
											}
										/>
									</FieldGroup>
								</MultiStepForm.Step>

								<MultiStepForm.Step id="new-club">
									<FieldGroup>
										<p className="text-muted-foreground mb-2 text-sm">
											Saindo do{' '}
											<span className="text-foreground font-medium">
												{seasonDetail.club.name}
											</span>
											. Informe o novo clube para continuar a temporada.
										</p>
										<form.Field
											name="newClubName"
											children={(field) => {
												const isInvalid =
													field.state.meta.isTouched &&
													!field.state.meta.isValid
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
									</FieldGroup>
								</MultiStepForm.Step>
							</div>

							<form.Subscribe
								selector={(state) => [state.isSubmitting, stepState.isLast]}
								children={([isSubmitting, isLast]) =>
									isLast ? (
										<Button
											type="submit"
											variant="default"
											size="sm"
											disabled={isSubmitting || isPending}
										>
											{isSubmitting || isPending ? (
												<Spinner />
											) : (
												'Confirmar transferência'
											)}
										</Button>
									) : (
										<div className="flex w-full justify-between gap-4">
											<Button
												type="button"
												variant="outline"
												disabled={stepState.isFirst || isSubmitting}
												onClick={stepState.goBack}
											>
												Voltar
											</Button>
											<Button
												type="button"
												disabled={isSubmitting}
												onClick={handleNext}
											>
												Continuar
											</Button>
										</div>
									)
								}
							/>
						</form>
					</MultiStepFormContext.Provider>
				)}
			</div>
		</main>
	)
}

const nonNegativeNumber = z
	.number({ error: 'Valor inválido' })
	.min(0, 'Mínimo 0')

const achievementItemSchema = z.object({
	id: z.string(),
	name: z.string().trim().min(1, 'Nome obrigatório'),
	achievementType: z.enum([
		AchievementTypes.Competition,
		AchievementTypes.IndividualAward,
	]),
	competitionType: z
		.enum([
			CompetitionTypes.League,
			CompetitionTypes.State,
			CompetitionTypes.NationalCup,
			CompetitionTypes.LeagueCup,
			CompetitionTypes.SuperCup,
			CompetitionTypes.Continental,
			CompetitionTypes.International,
			CompetitionTypes.Other,
		])
		.nullable(),
})

const statsStepSchema = z.object({
	appearances: nonNegativeNumber,
	goals: nonNegativeNumber,
	assists: nonNegativeNumber,
	cleanSheets: nonNegativeNumber,
	yellowCards: nonNegativeNumber,
	redCards: nonNegativeNumber,
	averageRating: z
		.number({ error: 'Valor inválido' })
		.min(0, 'Mínimo 0')
		.max(10, 'Máximo 10'),
})

const achievementsStepSchema = z.object({
	wonAchievements: z.boolean(),
	achievements: z.array(achievementItemSchema),
})

const newClubStepSchema = z.object({
	newClubName: z
		.string()
		.trim()
		.min(1, 'Nome do novo clube é obrigatório')
		.min(2, 'Mínimo de 2 caracteres'),
})

const schema = statsStepSchema
	.merge(achievementsStepSchema)
	.merge(newClubStepSchema)

const STEP_SCHEMAS = {
	stats: statsStepSchema,
	achievements: achievementsStepSchema,
	'new-club': newClubStepSchema,
} as const

function pickStepValues(
	stepId: TransferSeasonStepId,
	values: {
		appearances: number
		goals: number
		assists: number
		cleanSheets: number
		yellowCards: number
		redCards: number
		averageRating: number
		wonAchievements: boolean
		achievements: AchievementFormValue[]
		newClubName: string
	},
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
		case 'new-club':
			return {
				newClubName: values.newClubName,
			}
	}
}
