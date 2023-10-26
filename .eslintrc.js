const importGroups = ['module'];

const { compilerOptions } = require('get-tsconfig').getTsconfig('./tsconfig.json')['config'];
if ('paths' in compilerOptions) {
  const namespaces = Object.keys(compilerOptions.paths).map(path => path.replace('/*', ''));
  if (namespaces && namespaces.length > 0) {
    namespaces.forEach((element, index) => {
      importGroups.push('/^' + element + '/');
    });
  }
}

module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
    jest: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:n/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['eslint-comments', 'n', 'prettier'],
  rules: {
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }]
  },
  overrides: [
    {
      files: ['*.json', '*.jsonc'],
      excludedFiles: ['package.json', 'tsconfig*.json'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-json'],
      plugins: ['jsonc'],
      rules: {
        'jsonc/sort-keys': 'error'
      }
    },
    {
      files: ['**/*.{yml,yaml}'],
      parser: 'yaml-eslint-parser',
      extends: ['plugin:yml/standard', 'plugin:yml/prettier'],
      plugins: ['yml'],
      rules: {
        'yml/file-extension': ['error', { extension: 'yml' }]
      }
    },
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        ecmaVersion: 12,
        sourceType: 'module'
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:unicorn/recommended',
        'plugin:sonarjs/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:promise/recommended',
        'plugin:optimize-regex/recommended',
        'plugin:prettier/recommended',
        'plugin:security/recommended'
      ],
      plugins: [
        '@typescript-eslint',
        'prefer-arrow',
        'unicorn',
        'sonarjs',
        'import',
        'promise',
        'optimize-regex',
        'security',
        'simple-import-sort',
        'unused-imports',
        'deprecation',
        'eslint-plugin-import-helpers'
      ],
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true
          }
        },
        node: {
          tryExtensions: ['.json', '.node', '.js', '.ts', '.d.ts']
        }
      },
      rules: {
        'max-classes-per-file': 'off',
        'no-process-exit': 'off',
        'no-useless-constructor': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        'unicorn/no-new-array': 'off',
        'unicorn/no-fn-reference-in-iterator': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/consistent-destructuring': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-process-exit': 'off',
        'unicorn/prefer-module': 'off',
        'security/detect-object-injection': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/order': 'off',
        'import-helpers/order-imports': [
          'warn',
          {
            // example configuration
            newlinesBetween: 'always',
            groups: importGroups,
            alphabetize: { order: 'asc', ignoreCase: true }
          }
        ],
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['../*'],
                message: 'For imports of parent elements use better path aliases. For example, @domain/shared.'
              }
            ]
          }
        ],
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'simple-import-sort/exports': 'error',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-deprecated': 'error',
        'import/group-exports': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'import/exports-last': 'error',
        'import/no-cycle': ['error', { maxDepth: 1 }],
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'export' },
          { blankLine: 'any', prev: 'export', next: 'export' }
        ],
        quotes: [
          'error',
          'single',
          {
            allowTemplateLiterals: true
          }
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
        ],
        'unicorn/prevent-abbreviations': [
          'warn',
          {
            ignore: ['\\.e2e$', /^ignore/i]
          }
        ],
        'unicorn/prefer-node-protocol': 'error',
        'deprecation/deprecation': 'warn',
        'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'n/no-missing-import': 'off',
        'n/no-process-exit': 'off',
        'promise/no-callback-in-promise': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            overrides: {
              accessors: 'explicit',
              constructors: 'no-public',
              methods: 'explicit',
              properties: 'off',
              parameterProperties: 'explicit'
            }
          }
        ],
        'prefer-arrow/prefer-arrow-functions': [
          'warn',
          {
            disallowPrototype: true,
            singleReturnOnly: false,
            classPropertiesAllowed: false
          }
        ]
      },
      overrides: [
        {
          files: ['**/*.unit.ts', '**/*.int.ts', '**/*.e2e.ts', '**/*.spec.ts', '**/*.test.ts'],
          env: {
            jest: true,
            'jest/globals': true
          },
          extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:jest-extended/all'],
          plugins: ['jest', 'jest-extended'],
          rules: {
            'jest/expect-expect': ['error', { assertFunctionNames: ['expect', 'request.**.expect'] }]
          }
        }
      ]
    }
  ]
};
