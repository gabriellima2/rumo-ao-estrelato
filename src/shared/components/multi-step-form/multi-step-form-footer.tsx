import { useMultiStepFormContext } from './multi-step-form-context'
import { Button } from '@/shared/components/ui/button'
import { Spinner } from '@/shared/components/ui/spinner'

type MultiStepFormFooterProps = {
	onNext: () => void | Promise<void>
	onSubmit: () => void
	isSubmitting?: boolean
	nextLabel?: string
	submitLabel?: string
	submitVariant?: 'default' | 'destructive'
}

export function MultiStepFormFooter({
	onNext,
	onSubmit,
	isSubmitting = false,
	nextLabel = 'Continuar',
	submitLabel = 'Finalizar',
	submitVariant = 'default',
}: MultiStepFormFooterProps) {
	const { isFirst, isLast, goBack } = useMultiStepFormContext()

	return (
		<div className="flex w-full justify-between gap-4">
			<Button
				type="button"
				variant="outline"
				disabled={isFirst || isSubmitting}
				onClick={goBack}
			>
				Voltar
			</Button>

			{isLast ? (
				<Button
					type="button"
					variant={submitVariant}
					size="sm"
					disabled={isSubmitting}
					onClick={onSubmit}
				>
					{isSubmitting ? <Spinner /> : submitLabel}
				</Button>
			) : (
				<Button type="button" disabled={isSubmitting} onClick={onNext}>
					{nextLabel}
				</Button>
			)}
		</div>
	)
}
