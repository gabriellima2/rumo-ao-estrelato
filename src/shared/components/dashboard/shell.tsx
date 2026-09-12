import { cn } from '@/shared/lib/utils'

export function Shell({ className, ...props }: React.ComponentProps<'main'>) {
	return (
		<main
			className={cn('flex h-full flex-col items-center px-4 py-6', className)}
			{...props}
		/>
	)
}

export function ShellContent({
	className,
	...props
}: React.ComponentProps<'section'>) {
	return (
		<section
			className={cn('w-full max-w-2xl space-y-6', className)}
			{...props}
		/>
	)
}
