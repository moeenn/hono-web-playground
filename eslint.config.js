import tseslint from "typescript-eslint"

export default [
	{ files: ["**/*.{ts,tsx}"] },
	...tseslint.configs.recommended,
	{
		rules: {
			"no-warning-comments": [
				"warn",
				{ terms: ["TODO", "FIXME"], location: "anywhere" },
			],
			"no-console": "warn",
			quotes: [
				"warn",
				"double",
				{
					allowTemplateLiterals: true,
					avoidEscape: true,
				},
			],
			semi: ["warn", "never"],
			"no-unused-vars": "warn",
		},
	},
]
