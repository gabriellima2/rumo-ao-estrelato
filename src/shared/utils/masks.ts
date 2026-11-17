export function numbersMask(numbers: string): string {
	if (!numbers) return ''
	return numbers.replace(/\D/g, '')
}

/** Nota 0–10 com no máximo uma casa decimal (vírgula). */
export function averageRatingMask(input: string): string {
	if (!input) return ''

	const value = input.replace(/\./g, ',').replace(/[^\d,]/g, '')

	const commaIdx = value.indexOf(',')
	let intPart = commaIdx === -1 ? value : value.slice(0, commaIdx)
	let decPart =
		commaIdx === -1
			? ''
			: value
					.slice(commaIdx + 1)
					.replace(/,/g, '')
					.slice(0, 1)

	const hasTrailingComma =
		commaIdx !== -1 && decPart === '' && value.endsWith(',')

	if (intPart.length > 1) {
		intPart = intPart.replace(/^0+/, '') || '0'
	}

	if (intPart === '') {
		return hasTrailingComma ? '0,' : ''
	}

	const intNum = Number.parseInt(intPart, 10)
	if (intNum > 10) {
		intPart = '10'
		decPart = ''
	} else if (intNum === 10 && decPart !== '' && decPart !== '0') {
		decPart = '0'
	}

	if (hasTrailingComma || decPart !== '') {
		return decPart !== '' ? `${intPart},${decPart}` : `${intPart},`
	}
	return intPart
}
