import { MultiStepFormContext } from './multi-step-form-context'
import { MultiStepFormFooter } from './multi-step-form-footer'
import { MultiStepFormHeader } from './multi-step-form-header'
import { MultiStepFormStep as MultiStepFormStepComponent } from './multi-step-form-step'
import { useMultiStepForm } from './use-multi-step-form'
import type { MultiStepFormStep } from './multi-step-form-context'
import type { PropsWithChildren } from 'react'

type MultiStepFormProviderProps = PropsWithChildren<{
	steps: ReadonlyArray<MultiStepFormStep>
}>

function MultiStepFormProvider({
	steps,
	children,
}: MultiStepFormProviderProps) {
	const stepState = useMultiStepForm({ steps })

	return (
		<MultiStepFormContext.Provider value={stepState}>
			<div className="space-y-6">{children}</div>
		</MultiStepFormContext.Provider>
	)
}

export const MultiStepForm = {
	Provider: MultiStepFormProvider,
	Header: MultiStepFormHeader,
	Step: MultiStepFormStepComponent,
	Footer: MultiStepFormFooter,
}

export { useMultiStepForm }
export type { MultiStepFormStep }
