module.exports = {
    'parser': 'babel-eslint',
    'ecmaVersion': 6,
    'ecmaFeatures': {
        'jsx': true,
        'experimentalObjectRestSpread': true,
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'plugins': [
        'react',
    ],
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
    },
    'rules': {
        'no-global-assign': 'error',
        'no-invalid-this': 'error',
        'no-self-compare': 'error',
        'no-unused-expressions': 'error',
        'no-useless-call': 'error',
        'no-use-before-define': 'error',
        'jsx-quotes': ['error', 'prefer-double'],

        'brace-style': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'camelcase': 'error',
        'indent': ['error', 4],
        'eol-last': ['error', 'always'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'object-curly-spacing': ['error', 'never'],
        'one-var': ['error', 'never'],
        'no-multiple-empty-lines': ['error'],

        'react/jsx-boolean-value': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/prop-types': ['error', {ignore: ['children']}]
    },
};
