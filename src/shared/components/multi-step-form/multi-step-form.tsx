import { MultiStepFormContext } from './multi-step-form-context'
import { MultiStepFormFooter } from './multi-step-form-footer'
import { MultiStepFormHeader } from './multi-step-form-header'
import { MultiStepFormStep as MultiStepFormStepComponent } from './multi-step-form-step'
import { useMultiStepForm } from './use-multi-step-form'
import { MultiStepFormContent } from './multi-step-form-content'
import { MultiStepFormSubmitButton } from './multi-step-form-submit-button'
import { MultiStepFormBackButton } from './multi-step-form-back-button'
import type { MultiStepFormStep } from './multi-step-form-context'
import { cn } from '@/shared/lib/utils'

type MultiStepFormProviderProps<T extends string> =
	React.ComponentProps<'form'> & {
		steps: ReadonlyArray<MultiStepFormStep<T>>
		validateCurrentStep: (stepId: T) => boolean
	}

function MultiStepFormProvider<T extends string>({
	steps,
	children,
	className,
	onSubmit,
	validateCurrentStep,
	...props
}: MultiStepFormProviderProps<T>) {
	const stepState = useMultiStepForm({ steps, validateCurrentStep })

	return (
		<MultiStepFormContext.Provider value={stepState}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					if (validateCurrentStep(stepState.currentStep.id)) {
						onSubmit?.(e)
					}
				}}
				className={cn('flex flex-col items-end gap-4', className)}
				{...props}
			>
				{children}
			</form>
		</MultiStepFormContext.Provider>
	)
}

export const MultiStepForm = {
	Provider: MultiStepFormProvider,
	Header: MultiStepFormHeader,
	Content: MultiStepFormContent,
	Step: MultiStepFormStepComponent,
	Footer: MultiStepFormFooter,
	SubmitButton: MultiStepFormSubmitButton,
	BackButton: MultiStepFormBackButton,
}

export { useMultiStepForm }
export type { MultiStepFormStep }
