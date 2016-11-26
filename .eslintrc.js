module.exports = {
    'extends': ['airbnb'],
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
    },
    'globals': {
        'chrome': false,
    },
    'rules': {
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/prop-types': ['error', {ignore: ['children']}],
        'comma-dangle': ['error', 'always-multiline'],

        'no-else-return': 'off',
        'no-underscore-dangle': 'off',
        'no-prototype-builtins': 'off',
        'react/forbid-prop-types': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
    },
};
