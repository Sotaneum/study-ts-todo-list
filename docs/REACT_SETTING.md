# 요약

- ts 프로젝트 셋팅 후 React 세팅합니다.

## npm install

```bash
npm install -D react react-dom @types/react @types/react-dom --registry https://registry.npmjs.com
npm install -D ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin --registry https://registry.npmjs.com
```

## tsconfig.json 설정

```json
{
  ...
  "compilerOptions": {
    ...
    "jsx": "react",
    ...
  }
  ...
}
```

## webpack.config.js 설정

```js
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: __dirname + '/dist',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: './',
    publicPath: '/dist',
  },
};
```

## package.js 설정

```json
{
  ...
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack"
  },
  ...
}
```

- dev : 테스트 모드로 실행합니다. (npm run dev)
- build : 빌드합니다. (npm run build)

## src/index.html 만들기

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WELCOME TO REACT JS!</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

## src/App.js 만들기

```js
import React from 'react';

export default function () {
  return (
    <div>
      <h1>Hi there !</h1>
    </div>
  );
}
```

## src/index.tsx 만들기

```tsx
import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('root'));
```
