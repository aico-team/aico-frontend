// eslint.config.js
import { defineConfig } from "eslint/config";
// ESLint 내장 규칙/파서
import js from "@eslint/js";
// 브라우저 및 ES2021 전역 변수
import globals from "globals";
// React 플러그인
import pluginReact from "eslint-plugin-react";
// Prettier 플러그인
import pluginPrettier from "eslint-plugin-prettier";
// Prettier 충돌 규칙 해제
import configPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    // 무시할 폴더(빌드 결과물, 라이브러리 등)
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
  {
    // 린트 대상 파일(확장자)
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      parser: js.configs.recommended.parser, // ESLint 내장 parser
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    // 사용할 플러그인
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    // 병합할 규칙들(ESLint 권장 + React 권장 + Prettier 권장)
    rules: {
      // 자바스크립트 기본 권장 룰
      ...js.configs.recommended.rules,
      // React 권장 룰
      ...pluginReact.configs.recommended.rules,
      // Prettier 권장 룰(포매팅 위반을 ESLint가 체크)
      ...pluginPrettier.configs.recommended.rules,
      // eslint-config-prettier에서 제공하는 "충돌 제거" 룰
      ...configPrettier.rules,

      // React PropTypes 사용하지 않을 경우
      "react/prop-types": "off",

      // Prettier 포매팅 위반 시 경고(warn) 처리
      "prettier/prettier": "warn",
    },
  },
]);

