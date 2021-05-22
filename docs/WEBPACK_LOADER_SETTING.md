# 요약

- webpack loader 셋팅에 대해 정리했습니다.

## file-loader 설치하기

```bash
npm install -D file-loader --registry https://registry.npmjs.com
```

## webpack.config.js 수정하기

```js
module.exports = {
  ...
  module: {
    ...
    rules: [
      ...
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      ...
    ],
    ...
  },
  ...
};
```

