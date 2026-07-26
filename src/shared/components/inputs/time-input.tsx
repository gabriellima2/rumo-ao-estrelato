import { Input } from '../ui/input'
import { cn } from '@/shared/lib/utils'

export function TimeInput({
	className,
	...props
}: Omit<React.ComponentProps<typeof Input>, 'type' | 'inputMode' | 'mask'>) {
	return (
		<Input
			{...props}
			type="time"
			step="60"
			className={cn(
				'bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
				className,
			)}
		/>
	)
}
