//  @ts-check

/** @type {import('prettier').Config} */
const config = {
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	tabWidth: 2,
	endOfLine: 'lf',
	plugins: ['prettier-plugin-tailwindcss'],
}

export default config
