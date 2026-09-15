import { Skeleton } from '../ui/skeleton'
import { cn } from '@/shared/lib/utils'

export function SectionGroup({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return <div className={cn('flex flex-col gap-8', className)} {...props} />
}

export function Section({
	className,
	...props
}: React.ComponentProps<'section'>) {
	return <section className={cn('flex flex-col gap-4', className)} {...props} />
}

export function SectionHeader({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return <div className={cn('flex items-center gap-1', className)} {...props} />
}

export function SectionTitle({
	className,
	...props
}: React.ComponentProps<'h2'>) {
	return <h2 className={cn('text-xl font-semibold', className)} {...props} />
}

export function SectionTitleSkeleton({
	className,
	...props
}: React.ComponentProps<typeof Skeleton>) {
	return <Skeleton className={cn('h-7 w-48', className)} {...props} />
}
