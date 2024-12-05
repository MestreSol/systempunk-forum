import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-console": "warn",
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-eval": "error",
      "no-undef": "error",
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "arrow-spacing": ["error", { before: true, after: true }],
    },
  },
];
