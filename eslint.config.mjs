// eslint.config.js
import js from "@eslint/js";
import tsEsLintPlugin from "@typescript-eslint/eslint-plugin";
import tsEsLintParser from "@typescript-eslint/parser";

export default [
  { ignores: ["node_modules", "out", "dist"] },
  js.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": tsEsLintPlugin,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parser: tsEsLintParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...tsEsLintPlugin.configs["eslint-recommended"].overrides[0].rules,
      ...tsEsLintPlugin.configs["recommended-type-checked"].rules,
      "@typescript-eslint/no-explicit-any": "error",
    },
  }
];
