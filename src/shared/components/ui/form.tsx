import { cn } from '@/shared/lib/utils'

export function Form({
	className,
	onSubmit,
	...props
}: React.ComponentProps<'form'>) {
	return (
		<form
			className={cn('flex flex-col items-end gap-4', className)}
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				onSubmit?.(e)
			}}
			{...props}
		/>
	)
}
