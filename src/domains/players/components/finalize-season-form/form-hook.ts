import { createFormHook } from '@tanstack/react-form'
import { AchievementsField } from './achievements-field'
import { fieldContext, formContext } from './form-context'

export const { useAppForm, useTypedAppFormContext } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		AchievementsField,
	},
	formComponents: {},
})
