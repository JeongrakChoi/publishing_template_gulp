# publishing_template_gulp
웹퍼블리셔 작업용 개발환경(자동화 빌드)

## 개요  
- 주 사용자 : 웹 퍼블리셔
- 설명  
  - 코딩의 효율성을 올리고 반복작업을 최소화하여 효율을 올리기 위함.
  - 자동 컴파일 및 자동 배포 툴 이용 작업 시간 최소화.
  - express, nodemon 가상호스트 + sass 전처리기 + ejs(include) + sourcesmaps 디버깅 + imagemin 이미지 최적화 압축 

## 개발 환경
- Node.js (Gulp)

## 디렉토리  
```
/
gulpfile.js       // gulp 세팅 js
app.js            // 가상호스트 설정 js
package.json
package-lock.json
└ workspace       // 작업 폴더
  └ assets
    └ fonts
    └ images
    └ sass
    └ js
  └ html
    └ include
└ dist            // 산출물 폴더
```

## 설치
```
node, npm 설치 후
> npm init
> npm install -g gulp 또는 폴더 내 설치 npm install gulp -d
```
