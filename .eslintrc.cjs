module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'plugin:vue/vue3-essential',
		'@vue/eslint-config-airbnb-with-typescript',
		'plugin:prettier/recommended'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script',
				project: './tsconfig.json'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'parser': '@typescript-eslint/parser',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'vue'
	],
	'rules': {}
};
