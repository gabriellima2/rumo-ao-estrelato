import { useMultiStepFormContext } from './multi-step-form-context'
import type { PropsWithChildren } from 'react'

type MultiStepFormStepProps = PropsWithChildren<{
	id: string
}>

export function MultiStepFormStep({ id, children }: MultiStepFormStepProps) {
	const { currentStep } = useMultiStepFormContext()

	if (currentStep.id !== id) return null

	return <div className="space-y-4">{children}</div>
}
