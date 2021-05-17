# 요약

- Github Actions로 자동배포가 되도록 설정합니다.

## push 발생시, gh-pages 배포하기

- peaceiris/actions-gh-pages@v3 사용해서 deploy 해야합니다.
  - 아니면 직접 script 구현해서 env로 GITHUB_TOKEN를 받아서 push 해야합니다.

```yml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js 15.x
      uses: actions/setup-node@v2
      with:
        node-version: 15.x
    - run: npm ci
    - run: npm run build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

- Github Actions 에 대해서는 좀 더 공부해서 내용을 추가하도록 하겠습니다.
