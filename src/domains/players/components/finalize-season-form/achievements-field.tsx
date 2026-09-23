import { X } from 'lucide-react'
import { useFieldContext } from './form-context'
import { useTypedAppFormContext } from './form-hook'
import { finalizeSeasonFormOpts } from './form-options'
import type { AchievementItemValues } from './schema'
import {
	ACHIEVEMENT_TYPE_LABELS,
	AchievementTypes,
} from '@/domains/players/catalog/achievement-types'
import { COMPETITION_TYPE_OPTIONS } from '@/domains/players/catalog/competition-types'
import { TextInput } from '@/shared/components/inputs/text-input'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

export function AchievementsField() {
	return (
		<div className="space-y-4">
			<AchievementQuickAddButtons />
			<AchievementsList />
		</div>
	)
}

function AchievementQuickAddButtons() {
	const field = useFieldContext<AchievementItemValues[]>()

	return (
		<div className="flex flex-wrap gap-2">
			{COMPETITION_TYPE_OPTIONS.map(({ value, label }) => (
				<button
					key={value}
					type="button"
					onClick={() =>
						field.pushValue({
							achievementType: AchievementTypes.Competition,
							competitionType: value,
							name: label,
						})
					}
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
				onClick={() =>
					field.pushValue({
						achievementType: AchievementTypes.IndividualAward,
						competitionType: null,
						name: ACHIEVEMENT_TYPE_LABELS[AchievementTypes.IndividualAward],
					})
				}
				className={cn(
					'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
					'border-border hover:border-primary hover:bg-primary/5',
				)}
			>
				{ACHIEVEMENT_TYPE_LABELS[AchievementTypes.IndividualAward]}
			</button>
		</div>
	)
}

function AchievementsList() {
	const field = useFieldContext<AchievementItemValues[]>()
	const form = useTypedAppFormContext(finalizeSeasonFormOpts)

	if (field.state.value.length === 0) {
		return (
			<p className="text-muted-foreground text-sm">
				Nenhum título adicionado ainda.
			</p>
		)
	}

	return (
		<ul className="space-y-2">
			{field.state.value.map((_, index) => (
				<li
					key={index}
					className="flex items-center gap-2 rounded-lg border p-2"
				>
					<form.AppField name={`achievements[${index}].name`}>
						{(subField) => (
							<TextInput
								value={subField.state.value}
								onValueChange={subField.handleChange}
								onBlur={subField.handleBlur}
								className="flex-1"
							/>
						)}
					</form.AppField>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						title="Remover"
						onClick={() => field.removeValue(index)}
					>
						<X />
					</Button>
				</li>
			))}
		</ul>
	)
}
