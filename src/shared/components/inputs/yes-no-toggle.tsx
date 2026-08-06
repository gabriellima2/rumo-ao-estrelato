import { cn } from '@/shared/lib/utils'

type YesNoToggleProps = {
	value: boolean
	onChange: (value: boolean) => void
	yesLabel?: string
	noLabel?: string
}

export function YesNoToggle({
	value,
	onChange,
	yesLabel = 'Sim',
	noLabel = 'Não',
}: YesNoToggleProps) {
	return (
		<div className="flex gap-2">
			<button
				type="button"
				onClick={() => onChange(true)}
				className={cn(
					'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
					value
						? 'border-primary bg-primary/10 text-primary'
						: 'border-border hover:bg-muted',
				)}
			>
				{yesLabel}
			</button>
			<button
				type="button"
				onClick={() => onChange(false)}
				className={cn(
					'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
					!value
						? 'border-primary bg-primary/10 text-primary'
						: 'border-border hover:bg-muted',
				)}
			>
				{noLabel}
			</button>
		</div>
	)
}
