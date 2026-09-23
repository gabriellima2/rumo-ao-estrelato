import { Button } from '../ui/button'
import { useMultiStepFormContext } from './multi-step-form-context'

type MultiStepFormBackButtonProps = {
	label?: string
	isLoading?: boolean
}

export function MultiStepFormBackButton({
	isLoading,
	label = 'Voltar',
}: MultiStepFormBackButtonProps) {
	const { isFirst, goBack } = useMultiStepFormContext()

	return (
		<Button
			type="button"
			variant="outline"
			disabled={isFirst || isLoading}
			onClick={goBack}
		>
			{label}
		</Button>
	)
}
