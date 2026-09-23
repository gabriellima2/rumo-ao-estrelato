import { createContext, use } from 'react'

export type MultiStepFormStep<T extends string = string> = {
	id: T
}

type MultiStepFormContextValue = {
	steps: ReadonlyArray<MultiStepFormStep>
	currentStepIndex: number
	currentStep: MultiStepFormStep
	isFirst: boolean
	isLast: boolean
	progress: number
	goToStep: (index: number) => void
	goNext: () => void
	goBack: () => void
}

const MultiStepFormContext = createContext<MultiStepFormContextValue | null>(
	null,
)

export function useMultiStepFormContext() {
	const context = use(MultiStepFormContext)

	if (!context) {
		throw new Error(
			'MultiStepForm components must be used within MultiStepForm.Provider',
		)
	}

	return context
}

export { MultiStepFormContext }
