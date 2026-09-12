import { cn } from '@/shared/lib/utils'

export function Header({
	className,
	...props
}: React.ComponentProps<'header'>) {
	return (
		<header
			className={cn(
				'flex flex-row items-center justify-between gap-4',
				className,
			)}
			{...props}
		/>
	)
}

export function HeaderTextGroup({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return <div className={cn('space-y-1', className)} {...props} />
}

export function HeaderStart({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex flex-row items-center gap-2 md:gap-4', className)}
			{...props}
		/>
	)
}

export function HeaderTitle({
	className,
	...props
}: React.ComponentProps<'h1'>) {
	return (
		<h1
			className={cn(
				'font-serif text-xl font-bold tracking-tight md:text-2xl',
				className,
			)}
			{...props}
		/>
	)
}

export function HeaderDescription({
	className,
	...props
}: React.ComponentProps<'p'>) {
	return <p className={cn('text-muted-foreground', className)} {...props} />
}

export function HeaderActions({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex flex-row items-center gap-2', className)}
			{...props}
		/>
	)
}
