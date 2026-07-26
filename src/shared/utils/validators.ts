export function isEmptyString(value: string): boolean {
	return !value || value.trim() === ''
}

export function isValidInteger(n: number): boolean {
	if (isNaN(n)) return false
	return Number.isInteger(n)
}

export function isNullOrUndefined(value: unknown | null | undefined) {
	return value === null || value === undefined
}
