# 요약

- ts 프로젝트 세팅에 필요한 것들을 정리했습니다.

## npm init

- npm 설정파일(package.json)을 생성합니다.

```bash
npm init
```

- 이후 요구하는 절차에 맞게 내용을 채웁니다.

## npm install

- typescript에 필요한 라이브러리를 설치합니다.

```bash
npm i -D typescript ts-node @types/node @types/jest --registry https://registry.npmjs.com
```

- typescript : 타입스크립트 컴파일러를 설치합니다.
- ts-node : ES5로 변환하고 실행까지 동시에 하기 위해 설치합니다.
- @type/node : Promise와 같은 타입을 사용하려면 설치해야합니다.
- @types/jest : test를 위한 라이브러리입니다.
- --registry (optional) : 특정 npm 서버에서 설치할 경우 지정합니다. (필자의 PC의 경우 다른 곳이 default라 지정했습니다.)

## tsc --init

- typescript 설정파일을 생성합니다.

```bash
node ./node_modules/typescript/bin/tsc --init
# message TS6071: Successfully created a tsconfig.json file.
```

- 글로벌로 설치하지 않았기 때문에 직접 node_modules의 tsc 파일에 접근해서 호출합니다.

## tsconfig.json 설정

- tsconfig.json에는 기본적으로 설명이 잘 되어있다. 필요한 항목을 주석해제해서 사용하면 됩니다.
- 필자는 다음과 같은 세팅을 했습니다.

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    "target": "es5" /* ES5으로 변환합니다. */,
    "module": "commonjs" /* 브라우저에서 실행합니다. */,
    "sourceMap": true /* 디버깅을 위해 sourceMap을 활성화합니다. */,
    "outDir": "dist" /* 빌드된 결과물을 dist 폴더에 생성합니다. */,

    /* Module Resolution Options */
    "baseUrl": "./" /* 기본 경로를 지정했습니다. */,
    "esModuleInterop": true /* CommonJS 모듈을 ES6 모듈 형태로 import 할 수 있도록 합니다. */,
    "paths": {
      "*": ["node_modules/*"]
    } /* import의 기본 위치를 지정합니다. */
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

## package.json script 추가

- ts를 위한 몇가지 스크립트를 추가합니다.

```json
# package.json
{
  ...
  "scripts": {
    "dev": "ts-node src",
    "build": "tsc && node dist"
  },
  ...
}
```

- dev : script를 실행합니다. (`npm run dev`)
- build : script를 빌드하여 tsconfig.json에 설정된 outDir에 결과물을 저장합니다. (`npm run build`)
