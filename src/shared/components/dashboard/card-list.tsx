import { CardSkeleton } from '../ui/card'
import { cn } from '@/shared/lib/utils'

export function CardList({ className, ...props }: React.ComponentProps<'ul'>) {
	return <ul className={cn('space-y-4', className)} {...props} />
}

export function CardListSkeleton({ count = 4 }: { count?: number }) {
	return (
		<div className="space-y-4" aria-busy="true">
			{Array.from({ length: count }, (_, i) => (
				<CardSkeleton key={i} />
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

export function CardListEmpty({
	children,
	align = 'center',
}: {
	children: React.ReactNode
	align?: 'center' | 'left'
}) {
	return (
		<p
			className={cn('text-muted-foreground max-w-xl', {
				'text-left': align === 'left',
				'mx-auto text-center': align === 'center',
			})}
			role="status"
		>
			{children}
		</p>
	)
}
