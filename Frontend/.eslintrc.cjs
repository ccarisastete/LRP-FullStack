module.exports = {
    root: true,
    env: {browser: true, es2020:true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:security/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh','security'],
    rules: {
        'react-refresh/only-export-components':'warn',
        '@typescript-eslint/no-explicit-any':'off',
        'security/detect-object-injection':'error',
        'security/detect-non-literal-fs-file':'off',
        'no-console':'warn'
    }
}