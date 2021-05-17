# 요약

- Github pages로 배포를 세팅합니다.

## gh-pages 설치

```bash
npm install -D gh-pages --registry https://registry.npmjs.com
```

## package.json 수정

```json
{
  ...
  "homepage":"https://{사용자 이름}.github.io/{저장소 이름}",
  "scripts": {
    ...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
  ...
}
```

- homepage는 배포가 될 URL를 지정합니다.
- predeploy(`npm run predeploy`)와 deploy(`npm run deploy`) 스크립트를 추가합니다.
- predeploy는 deploy 명령어를 수행하기 전에 수행됩니다.
