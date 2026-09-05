import { PlayerMomentTypeIcon } from './player-moment-type-icon'
import type { PlayerMomentType } from '../types'
import { cn } from '@/shared/lib/utils'

type PlayerMomentTypePickerProps = {
	types: PlayerMomentType[]
	value: string
	onChange: (typeId: string) => void
}

export function PlayerMomentTypePicker({
	types,
	value,
	onChange,
}: PlayerMomentTypePickerProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{types.map((type) => {
				const isSelected = value === type.id

				return (
					<button
						key={type.id}
						type="button"
						onClick={() => onChange(type.id)}
						className={cn(
							'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
							isSelected
								? 'border-transparent text-white'
								: 'border-border bg-background text-foreground hover:bg-muted',
						)}
						style={isSelected ? { backgroundColor: type.color } : undefined}
					>
						<PlayerMomentTypeIcon
							icon={type.icon}
							className="size-4"
							style={isSelected ? undefined : { color: type.color }}
						/>
						{type.name}
					</button>
				)
			})}
		</div>
	)
}
