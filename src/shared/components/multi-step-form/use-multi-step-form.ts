import { useCallback, useMemo, useState } from 'react'
import type { MultiStepFormStep } from './multi-step-form-context'

type UseMultiStepFormOptions = {
	steps: ReadonlyArray<MultiStepFormStep>
	initialStepIndex?: number
}

export function useMultiStepForm({
	steps,
	initialStepIndex = 0,
}: UseMultiStepFormOptions) {
	const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex)

	const currentStep = steps[currentStepIndex]
	const isFirst = currentStepIndex === 0
	const isLast = currentStepIndex === steps.length - 1
	const progress = ((currentStepIndex + 1) / steps.length) * 100

	const goToStep = useCallback((index: number) => {
		if (index >= 0 && index < steps.length) {
			setCurrentStepIndex(index)
		}
	}, [steps.length])

	const goNext = useCallback(() => {
		setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1))
	}, [steps.length])

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
