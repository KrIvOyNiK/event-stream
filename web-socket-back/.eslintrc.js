module.exports ={
  env: {
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'simple-import-sort'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  ignorePatterns: ['.eslintrc.js'],
  root: true,
  "parserOptions": {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  "rules": {
    "strict": ["error", "global"],
    "eqeqeq": "error",
    "curly": ["error", "multi-line", "consistent"],
    "no-shadow-restricted-names": "error",
    "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
    "no-use-before-define": ["off", { "functions": false }],
    "no-unused-vars": "off", 
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-namespace": "off",
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  }
}
