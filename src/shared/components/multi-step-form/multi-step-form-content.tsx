import { cn } from '@/shared/lib/utils'

export function MultiStepFormContent({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return <div className={cn('w-full space-y-6', className)} {...props} />
}
