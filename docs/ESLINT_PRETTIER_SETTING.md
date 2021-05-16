# 요약

- ESLint와 Prettier를 설정합니다.

## ESLint, Prettier 설치하기

```bash
npm install -D npm install -D prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser --registry https://registry.npmjs.com
```

## Prettier 설정하기

- .prettierrc 파일을 생성합니다.

```json
# .prettierrc
{
  "parser": "typescript",
  "singleQuote": true,
  "printWidth": 110,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always",
  "endOfLine": "auto",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve"
}
```

## ESLint 설정하기

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint","import"],
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "prettier/react",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  }, 
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "linebreak-style": 0,
    "import/no-dynamic-require": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "global-require": 0,
    "import/no-extraneous-dependencies": 0,
    "jsx-quotes": ["error", "prefer-single"],
    "react/jsx-props-no-spreading": 0, 
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "import/extensions": 0,
    "no-use-before-define": 0, 
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "no-shadow": "off",
    "react/prop-types": 0,
    "no-empty-pattern": 0,
    "no-alert": 0,
    "react-hooks/exhaustive-deps": 0
  },
  "settings": { 
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".js"] 
    }, 
    "import/resolver": { 
      "typescript": "./tsconfig.json" ,
      "alias": {
        "map": [["@", "./src"]]
      }
    }
  }
}

```

## VSCode 설정하기

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## 출처

- [[Typescript & React & Eslint 환경설정 2편] ESLint & Prettier 설정](https://velog.io/@xortm854/Typescript-React-Eslint-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95-2%ED%8E%B8-ESLint-Prettier-%EC%84%A4%EC%A0%95)
