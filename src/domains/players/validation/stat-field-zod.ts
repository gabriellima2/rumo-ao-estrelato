import z from 'zod'

import { parseDecimalBR } from '@/shared/utils/converters'

function refineNonNegativeStat(
	value: string,
	ctx: z.RefinementCtx,
	requiredMessage: string,
) {
	if (!value.trim()) {
		ctx.addIssue({ code: 'custom', message: requiredMessage })
		return
	}

	const parsed = Number(value)
	if (Number.isNaN(parsed) || !Number.isInteger(parsed) || parsed < 0) {
		ctx.addIssue({ code: 'custom', message: 'Valor inválido' })
	}
}

function refineAverageRatingStat(
	value: string,
	ctx: z.RefinementCtx,
	requiredMessage: string,
) {
	if (!value.trim()) {
		ctx.addIssue({ code: 'custom', message: requiredMessage })
		return
	}

	const rating = parseDecimalBR(value)
	if (Number.isNaN(rating)) {
		ctx.addIssue({ code: 'custom', message: 'Valor inválido' })
		return
	}
	if (rating < 0) {
		ctx.addIssue({ code: 'custom', message: 'Mínimo 0' })
	}
	if (rating > 10) {
		ctx.addIssue({ code: 'custom', message: 'Máximo 10' })
	}
}

export function nonNegativeStat(requiredMessage: string) {
	return z
		.string()
		.superRefine((value, ctx) =>
			refineNonNegativeStat(value, ctx, requiredMessage),
		)
}

export function averageRatingStat(requiredMessage: string) {
	return z
		.string()
		.superRefine((value, ctx) =>
			refineAverageRatingStat(value, ctx, requiredMessage),
		)
}
