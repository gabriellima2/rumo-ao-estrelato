import { isNullOrUndefined } from './validators'

export function toInteger(value: string | number | undefined | null): number {
	if (isNullOrUndefined(value)) {
		return NaN
	}

	const number = typeof value === 'string' ? parseInt(value, 10) : value

	return isNaN(number) ? NaN : number
}

export function parseDecimalBR(value: string): number {
	const trimmed = value.trim()
	if (!trimmed || trimmed === ',') return NaN

	const normalized = trimmed.endsWith(',') ? trimmed.slice(0, -1) : trimmed

	if (!normalized) return NaN

	const number = Number.parseFloat(normalized.replace(',', '.'))
	return Number.isNaN(number) ? NaN : number
}

export function toNonNegativeInteger(value: string): number {
	if (!value.trim()) return 0
	const parsed = toInteger(value)
	return Number.isNaN(parsed) ? 0 : Math.max(0, parsed)
}

/** Converte para NUMERIC(3,1) — uma casa decimal. */
export function toSeasonAverageRating(value: string): number {
	const parsed = parseDecimalBR(value)
	const rating = Number.isNaN(parsed) ? 0 : parsed
	return Math.round(rating * 10) / 10
}
