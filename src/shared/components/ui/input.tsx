import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '@/shared/lib/utils'

function Input({
	className,
	type,
	isInvalid,
	mask,
	onChange,
	onValueChange,
	...props
}: React.ComponentProps<'input'> & {
	isInvalid?: boolean
	onValueChange?: (value: string) => void
	mask?: (value: string) => string
}) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (mask) {
			e.target.value = mask(e.target.value)
		}

		onValueChange?.(e.target.value)
		onChange?.(e)
	}

	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			aria-invalid={isInvalid}
			onChange={handleChange}
			className={cn(
				'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
				className,
			)}
			{...props}
		/>
	)
}

export { Input }
