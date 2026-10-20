import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      // varsIgnorePattern evita erros em variáveis não usadas que começam com maiúscula
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      // react-refresh garante que o HMR (Hot Module Replacement) funcione bem
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // react/prop-types: off desativa a validação obrigatória de props
      "react/prop-types": "off",
    },
  },
]);
