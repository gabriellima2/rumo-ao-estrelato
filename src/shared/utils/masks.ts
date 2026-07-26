export function numbersMask(numbers: string): string {
	if (!numbers) return ''
	return numbers.replace(/\D/g, '')
}
