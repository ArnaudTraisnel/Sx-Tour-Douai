module.exports = {
  env: {
    node: true,      // Active l'environnement Node.js (require, process, module, etc.)
    es2022: true     // Active les fonctionnalités ES2022
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'script'  // CommonJS (pas module ES6)
  },
  rules: {
    'no-console': 'off',  // Autorise console.log dans les scripts CLI
    'no-unused-vars': 'warn',
    'no-undef': 'error'
  }
};
