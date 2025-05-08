import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:prettier/recommended"),
  globalIgnores(["src/app/(payload)/admin/importMap.js"]),
  {
    rules: {
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react**",
              group: "builtin",
            },
            {
              pattern: "@react**",
              group: "builtin",
            },
            {
              pattern: "next",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "next/**",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "payload",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "payload/**",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "@payload-config",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "@payloadcms/**",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "node_modules/**",
              group: "builtin",
            },
            {
              pattern: "@/env.mjs",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/lib/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/store",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/store/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/services/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/types/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/app/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/constants/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/hooks/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/containers/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/components/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/styles/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
        },
      ],
    },
  },
]);

export default eslintConfig;
