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

## gulpfile.js

### 1. 모듈 호출
> Gulp 사용 및 자동화를 위해 필요한 모듈 변수 선언

```javascript
var gulp = require('gulp');
var ejs = require('gulp-ejs');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var imagemin = require('gulp-imagemin');
var del = require('del');
```

### 2. 파일 경로
> 작업 폴더와 산출물 경로 따로 구분

```javascript
// 소스 파일 경로
var PATH = { 
    HTML: './workspace/html',
	ASSETS: { 
		FONTS: './workspace/assets/fonts',
		IMAGES: './workspace/assets/images',
		STYLE: './workspace/assets/sass',
		SCRIPTS: './workspace/assets/js'
	} 
}, 
// 산출물 경로 
DEST_PATH = { 
    HTML: './dist/html',
	ASSETS: {
		FONTS: './dist/resources/fonts',
		IMAGES: './dist/resources/images',
		STYLE: './dist/resources/css',
		SCRIPTS: './dist/resources/js'
	} 
}; 
```

### 3. ejs
> include 목적으로 사용하며, 작업 폴더 내 include폴더에 .ejs 확장자로 작업  
> 빌드시 산출물 폴더에 html 확장자로 변환

```javascript
gulp.task('gulpEjs',() => {
	return new Promise( resolve => {
		gulp.src(PATH.HTML + '/**/*.html')
			.pipe( ejs() )
			.pipe(gulp.dest(DEST_PATH.HTML));

		resolve();
	})
});
```

### 4. sass
> sass 전처리기  
> sourcesmaps, watch와 연동해 자동화 시킬 것  
> 작업물은 산출물 폴더 내 css로 변환

```javascript
gulp.task('scss:compile', () => { 
	return new Promise( resolve => { 
		var options = { 
			outputStyle: "nested", // nested, expanded, compact, compressed 
			indentType: "tab", // space, tab 
			indentWidth: 4,  
			precision: 8, 
			sourceComments: true // 코멘트 제거 여부 
		}; 
		
		gulp.src( PATH.ASSETS.STYLE + '/**/*.scss' )
			.pipe( sourcemaps.init() )
			.pipe( scss(options) )
			.pipe( sourcemaps.write() )
			.pipe( gulp.dest( DEST_PATH.ASSETS.STYLE ) );
		
		resolve(); 
	});
});
```

### 4. resources (js, fonts)
> js, font는 따로 압축 라이브러리를 추가하지 않았음.    
> 빌드시 산출물 폴더에 복사만 가능  

```javascript
gulp.task('javascript', () => { 
	return new Promise( resolve => { 
		gulp.src( PATH.ASSETS.SCRIPTS + '/**/*.js')
			.pipe( gulp.dest( DEST_PATH.ASSETS.SCRIPTS)); 
			
		resolve();
	});
});

gulp.task('fonts', () => { 
	return new Promise( resolve => { 
		gulp.src( PATH.ASSETS.FONTS + '/**/*.*')
			.pipe( gulp.dest( DEST_PATH.ASSETS.FONTS)); 
			
		resolve();
	});
});
```
