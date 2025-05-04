import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',  // Disable unused-vars check for TypeScript
      '@next/next/no-img-element': 'off',        // Disable warning for using <img> instead of <Image />
      '@typescript-eslint/no-explicit-any': 'off',  // Disable the 'any' type rule globally
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off"
    },
  },
];

export default eslintConfig;
