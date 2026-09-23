import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { useMultiStepFormContext } from './multi-step-form-context'

type ButtonVariant = NonNullable<React.ComponentProps<typeof Button>['variant']>

type MultiStepFormSubmitButtonProps = {
	submitLabel?: string
	submitVariant?: ButtonVariant
	nextLabel?: string
	nextVariant?: ButtonVariant
	isLoading?: boolean
}

export function MultiStepFormSubmitButton({
	submitLabel = 'Finalizar',
	submitVariant = 'default',
	nextLabel = 'Continuar',
	nextVariant = 'default',
	isLoading,
}: MultiStepFormSubmitButtonProps) {
	const { isLast, goNext } = useMultiStepFormContext()

	return (
		<>
			{isLast ? (
				<Button type="submit" variant={submitVariant} disabled={isLoading}>
					{isLoading ? <Spinner /> : submitLabel}
				</Button>
			) : (
				<Button
					type="button"
					variant={nextVariant}
					disabled={isLoading}
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						goNext()
					}}
				>
					{nextLabel}
				</Button>
			)}
		</>
	)
}
