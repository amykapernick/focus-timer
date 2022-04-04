module.exports = {
	extends: [`airbnb-base`],
	plugins: [
		`import`,
		`react`
	],
	parserOptions: {
		ecmaVersion: `latest`,
		sourceType: `module`,
		ecmaFeatures: {
			jsx: true,
		}
	},
	rules: {
		'linebreak-style': 0,
		'no-tabs': 0,
		camelcase: 0,
		indent: [`error`, `tab`, {
			SwitchCase: 1,
			VariableDeclarator: 1
		}],
		'arrow-spacing': [`error`, { before: true, after: true }],
		'comma-dangle': [
			`error`,
			{
				objects: `only-multiline`,
				arrays: `only-multiline`,
				imports: `never`,
				exports: `never`,
				functions: `never`,
			},
		],
		'no-underscore-dangle': [
			`error`,
			{
				allow: [
					`_uid`
				]
			}
		],
		'no-var': `error`,
		'no-unused-vars': 1,
		'one-var': [`error`, { initialized: `never`, uninitialized: `consecutive` }],
		quotes: [`error`, `backtick`],
		'no-param-reassign': 0,
		'react/jsx-uses-react': `error`,
		'react/jsx-uses-vars': `error`,
		'class-methods-use-this': 0
	}
};
