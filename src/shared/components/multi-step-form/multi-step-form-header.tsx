import { useMultiStepFormContext } from './multi-step-form-context'
import { Progress } from '@/shared/components/ui/progress'

export function MultiStepFormHeader() {
	const { progress } = useMultiStepFormContext()

	return <Progress value={progress} />
}
