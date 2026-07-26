import { isNullOrUndefined } from './validators'

export function toInteger(value: string | number | undefined | null): number {
	if (isNullOrUndefined(value)) {
		return NaN
	}

	const number = typeof value === 'string' ? parseInt(value, 10) : value

	return isNaN(number) ? NaN : number
}
