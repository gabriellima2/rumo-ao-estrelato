import { Skeleton } from '../ui/skeleton'
import { cn } from '@/shared/lib/utils'

export function MultiStepFormHeaderSkeleton({
	className,
	...props
}: React.ComponentProps<typeof Skeleton>) {
	return <Skeleton className={cn('h-8 w-full', className)} {...props} />
}

export function MultiStepFormSkeleton({
	className,
	...props
}: React.ComponentProps<typeof Skeleton>) {
	return <Skeleton className={cn('h-48 w-full', className)} {...props} />
}
