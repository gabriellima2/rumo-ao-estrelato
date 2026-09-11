import { Skeleton } from '../ui/skeleton'
import { cn } from '@/shared/lib/utils'

export function CardList({ className, ...props }: React.ComponentProps<'ul'>) {
	return <ul className={cn('space-y-4', className)} {...props} />
}

export function CardListSkeleton({ count = 4 }: { count?: number }) {
	return (
		<div className="space-y-4" aria-busy="true">
			{Array.from({ length: count }, (_, i) => (
				<Skeleton key={i} className="h-19.5" />
			))}
		</div>
	)
}

export function CardListItem({
	className,
	...props
}: React.ComponentProps<'li'>) {
	return <li className={cn(className)} {...props} />
}

export function CardListEmpty({ children }: { children: React.ReactNode }) {
	return (
		<p
			className="text-muted-foreground mx-auto max-w-xl text-center"
			role="status"
		>
			{children}
		</p>
	)
}
