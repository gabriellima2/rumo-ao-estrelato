import { cn } from '@/shared/lib/utils'

export function Shell({ className, ...props }: React.ComponentProps<'main'>) {
	return (
		<main
			className={cn(
				'flex min-h-svh w-full flex-col items-center px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]',
				className,
			)}
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
