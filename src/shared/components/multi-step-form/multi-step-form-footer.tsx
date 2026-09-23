import { cn } from '@/shared/lib/utils'

export function MultiStepFormFooter({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex w-full justify-between gap-4', className)}
			{...props}
		/>
	)
}
