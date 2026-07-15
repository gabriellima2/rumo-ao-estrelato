//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
	...tanstackConfig,
	{
		rules: {
			'import/no-cycle': 'off',
			'pnpm/json-enforce-catalog': 'off',
			'@typescript-eslint/array-type': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
		},
	},
	{
		ignores: [
			'eslint.config.js',
			'prettier.config.js',
			'node_modules',
			'.tanstack',
			'.output',
		],
	},
]
