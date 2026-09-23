import { useCallback, useMemo, useState } from 'react'
import type { MultiStepFormStep } from './multi-step-form-context'

type UseMultiStepFormOptions<T extends string> = {
	steps: ReadonlyArray<MultiStepFormStep<T>>
	initialStepIndex?: number
	validateCurrentStep: (stepId: T) => boolean
}

export function useMultiStepForm<T extends string>({
	steps,
	initialStepIndex = 0,
	validateCurrentStep,
}: UseMultiStepFormOptions<T>) {
	const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex)

	const currentStep = steps[currentStepIndex]
	const isFirst = currentStepIndex === 0
	const isLast = currentStepIndex === steps.length - 1
	const progress = ((currentStepIndex + 1) / steps.length) * 100

	const goToStep = useCallback(
		(index: number) => {
			if (index >= 0 && index < steps.length) {
				setCurrentStepIndex(index)
			}
		},
		[steps.length],
	)

	const goNext = useCallback(() => {
		if (validateCurrentStep(currentStep.id)) {
			setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1))
		}
	}, [steps.length, currentStep.id, validateCurrentStep])

	const goBack = useCallback(() => {
		setCurrentStepIndex((index) => Math.max(index - 1, 0))
	}, [])

	return useMemo(
		() => ({
			steps,
			currentStepIndex,
			currentStep,
			isFirst,
			isLast,
			progress,
			goToStep,
			goNext,
			goBack,
		}),
		[
			steps,
			currentStepIndex,
			currentStep,
			isFirst,
			isLast,
			progress,
			goToStep,
			goNext,
			goBack,
		],
	)
}
