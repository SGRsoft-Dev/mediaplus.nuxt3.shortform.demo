## Shortform Platform DEMO

VIDEO24를 이용한 Shortform 플랫폼을 구현한 FrontEnd 데모코드입니다.




![](https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/f4bc8f7e3e618cf1f869ec56cc3f917c.png)



## 데모페이지
[Shortform 플랫폼](https://mediaplus-shortform-nuxt3-demo.web.app/)


## 데모페이지 소스코드
[https://github.com/SGRsoft-Dev/video24.nuxt3.shortform.demo](https://github.com/SGRsoft-Dev/video24.nuxt3.shortform.demo)


*** 

![](https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/4f8b9055fd11fe2a1595586c52a7ec29.png)

# VIDEO24 for NAVERCLOUD PLATFORM
VIDEO24는 네이버클라우드 플랫폼에서 동작하는 클라우드 네이티브앱입니다.

## VIDEO24 소개
VIDEO24는 끊김 없이 안정적인 동영상 스트리밍 구축과 연동이 가능한 SaaS입니다.

네이버클라우드 플랫폼의 인프라를 사용한 미디어 서비스를 구축을 고려하고 있다면,

VIDEO24는 이러한 번거로운 연동 작업을 단축시켜, 동영상 스트리밍에 필요한 솔루션을 ONESTOP 연동할 수 있습니다.

끊김 없는 안정적인 동영상 재생을 위한 최신 스트리밍 구축/연동 SaaS, MEDIA PLUS를 이용해보세요.


***




## 사전 준비사항
VIDEO24의 Shortform 데모를 이용하기 위해, VIDEO24의 계정이 필요합니다.

***

## 필수
- VIDEO24 프로젝트 API KEY

***

## 제한사항

현재 데모코드에 사용된 필수 요소들은 개발자 로컬 테스트에서만 동작합니다. (http://localhost:3000)

실제 서비스를 위해서는 VIDEO24의 계정을 발급받아야 합니다. (2023년 9월 BETA 서비스 오픈 예정)

***


## 개발환경 구성

- Vue3 + Nuxt3  를 이용한 CSR/SSR 방식을 지원하는 웹사이트
- Node v16 이상 필요
- TypeScript
- Tailwind CSS

***

## 참고 사이트
### NAVERCLOUD PLATFORM VOD Station

https://www.ncloud.com/product/media/newVodStation

### Nuxt 3 Introduction

https://nuxt.com/docs/getting-started/introduction

### Nuxt 3 UI

https://ui.nuxtlabs.com/getting-started

### Tailwind CSS
https://tailwindcss.com/docs/installation

### Nuxt 3 Tailwind CSS
https://tailwindcss.nuxtjs.org/

***


## Nuxt 3 설정 수정

```javascript
// nuxt.config.js
export default defineNuxtConfig({
    // ...
    runtimeConfig:{
        public:{
            appName:'My Shortform app',
            VIDEO24ApiKey:'{VIDEO24 프로젝트 API KEY}',
        },

    },
    // ...
})
```
nuxt.config.js 파일에 VIDEO24 프로젝트 API KEY를 추가합니다.

***

## 실행방법

```bash
$ yarn install
$ yarn run dev
```


## 빌드

```bash
$ yarn run generate
```

## 빌드 미리보기

```bash
$ npx serve .output/public
```

## Firebase Hosting 배포

```javascript
//firebase.json
{
    "hosting": {
        "public": ".output/public",
        "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        "rewrites": [
            {
                "source": "**",
                "destination": "/index.html"
            }
        ]
    }
}


```
- firebase.json 파일을 생성합니다.

```bash
$ npm install -g firebase-tools@latest
$ firebase login
$ firebase init 

```
- firebase cli를 설치하고, 로그인을 합니다.

```bash
$ yarn run generate
$ firebase deploy --only hosting
```
- 빌드 후 배포를 합니다.




***


## 문의하기


SGRSOFT 개발팀  : dev@sgrsoft.com

채널톡 : https://sgrsoft.channel.io/home

영업 및 네이버클라우드 가입 문의 : biz@sgrsoft.com

SGRSOFT를 통하여 네이버클라우드 플랫폼 크래딧을 지원 받을 수 있습니다. (최대 300만원)


VIDEO24 웹사이트 :
[https://video24.app/](https://video24.app/)
