import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Подтягиваем Next.js, TS-рекомендуемые правила,
  // а также Prettier и его recommended
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier", // eslint-config-prettier
    "plugin:prettier/recommended", // eslint-plugin-prettier/recommended
  ),

  // Регистрируем плагины
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
  },

  // Ваши пользовательские правила
  {
    rules: {
      // max-len
      "max-len": [
        "warn",
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
      "@typescript-eslint/max-len": "off", // отключаем дублирование
      // no-unused-vars
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      // console
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Prettier как правило ESLint
      "prettier/prettier": "warn",
    },
  },
];
