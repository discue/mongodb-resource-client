import js from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
    js.configs.recommended,
    jsdoc.configs['flat/recommended'],
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.node
            }
        },
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            "@stylistic/no-extra-semi": "warn",
            "@stylistic/array-element-newline": ["warn", "consistent"],
            "@stylistic/semi": [
                "error",
                "never"
            ],
            'jsdoc/tag-lines': 'off',
            'jsdoc/no-defaults': 'off',
            "jsdoc/sort-tags": 1,
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                }
            ],
            "quotes": [
                "error",
                "single",
                {
                    "allowTemplateLiterals": true
                }
            ]
        }
    }
]
