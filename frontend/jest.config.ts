import type { Config } from "jest";
import { compilerOptions } from "./tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest";

const config: Config = {
  // ⬇︎ Babel-jest будет преобразовывать .ts/.tsx – JSX больше не «неожиданный»
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },

  testEnvironment: "jsdom",

  // Явно сообщаем Jest, как резолвить алиас "@/..."
  moduleNameMapper: {
    // берём правила прямо из tsconfig
    ...pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
      prefix: "<rootDir>/",
    }),
  },

  // какие расширения считать модулями
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // чтобы отчёты покрытия собирались корректно
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default config;
