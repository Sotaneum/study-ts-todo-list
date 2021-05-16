# 요약

- ts 프로젝트 셋팅 후 alias 셋팅을 합니다.

## webpack.config.js 수정합니다

```js
// webpack.config.js
const path = require('path');
module.exports = {
  ...
  resolve: {
    ...
    ...
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
  ...
}
```

## .eslintrc.json 수정합니다

```json
{
  ...
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [["@", "./src"]]
      }
    }
  },
  ...
}
```

## tsconfig.json 수정합니다

```json
{
  ...
    "paths": {
      ...
      "@/*": ["src/*"]
    }
  ...
}
```
