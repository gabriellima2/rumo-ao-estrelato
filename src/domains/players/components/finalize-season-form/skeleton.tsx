import { MultiStepForm } from '@/shared/components/multi-step-form/multi-step-form'
import {
	MultiStepFormHeaderSkeleton,
	MultiStepFormSkeleton,
} from '@/shared/components/multi-step-form/multi-step-form-skeleton'

export function FinalizeSeasonFormSkeleton() {
	return (
		<MultiStepForm.Content>
			<MultiStepFormHeaderSkeleton />
			<MultiStepFormSkeleton />
		</MultiStepForm.Content>
	)
}
