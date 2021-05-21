var gulp = require('gulp');
var ejs = require('gulp-ejs');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var imagemin = require('gulp-imagemin');
var del = require('del');


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

gulp.task('gulpEjs',() => {
	return new Promise( resolve => {
		gulp.src(PATH.HTML + '/**/*.html')
			.pipe( ejs() )
			.pipe(gulp.dest(DEST_PATH.HTML));

		resolve();
	})
});


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

gulp.task('imagemin', () => { 
	return new Promise( resolve => { 
		gulp.src( PATH.ASSETS.IMAGES + '/**/*.*' ) 
			.pipe(imagemin({ 
            	optimizationLevel: 5, progressive: true, interlaced: true 
        	}))

		.pipe( gulp.dest(DEST_PATH.ASSETS.IMAGES));
				
		resolve(); 
	}); 
});

gulp.task('clean', () => { 
	return new Promise( resolve => { 
		del.sync('./dist');
		resolve(); 
	}); 
});

gulp.task('nodemon:start', () => { 
    return new Promise( resolve => { 
        nodemon({ 
            script: 'app.js', 
            watch: DEST_PATH.HTML
        }); 
        
        resolve(); 
    });
});

gulp.task('watch', () => { 
	return new Promise( resolve => { 
		gulp.watch(PATH.HTML + "/**/*.html", gulp.series(['gulpEjs'])); 
		gulp.watch(PATH.ASSETS.STYLE + "/**/*.scss", gulp.series(['scss:compile'])); 
		gulp.watch(PATH.ASSETS.SCRIPTS + "/**/*.js", gulp.series(['javascript']));
		gulp.watch(PATH.ASSETS.IMAGES + "/**/*.*", gulp.series(['imagemin']))

		resolve(); 
	}); 
}); 

gulp.task( 'default', gulp.series(['clean', 'gulpEjs', 'scss:compile', 'javascript', 'fonts', 'imagemin', 'nodemon:start', 'watch']) );