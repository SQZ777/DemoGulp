var gulp = require('gulp'),
    concat = require('gulp-concat') //引入Concat套件
uglify = require('gulp-uglify') //引入uglify套件
sass = require('gulp-sass')     //引入sass套件
connect = require('gulp-connect') //引入connect套件
watch = require('gulp-watch')     //引入watch套件

gulp.task('serverGO', function () {
    connect.server({
        root: 'build', //設定開啟位置
        livereload: true, //開啟livereload
        port: 8787 //設定預設port為8787
    });
});

//將src內的所有js打包成all.js並將all.js輸出至build/js的目錄下
gulp.task('ConcatAndUglify', function () {
    return watch('src/**/*.js', function () {   //監看src目錄底下的所有js檔
        gulp.src('src/**/*.js')                 //設定來源檔案為src目錄底下的所有js檔
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./build/js'))      //輸出至build目錄底下
            .pipe(connect.reload());            //利用connect套件刷新頁面
    });
});

//將src內的所有scss輸出至build目錄下
gulp.task('sassGO', function () {
    return watch('src/**/*.scss', function () {     //監看src目錄底下的所有scss檔
        gulp.src('src/**/*.scss')                //設定來源檔案為src目錄底下的所有scss檔
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./build/'))             //輸出至build目錄底下
            .pipe(connect.reload());                 //利用connect套件刷新頁面
    });
});

gulp.task('htmlGO', function () {
    return watch('build/**/*.html', function () {
        gulp.src('build/**/*.html') 
            .pipe(connect.reload());                 //利用connect套件刷新頁面
    });
});

//內建的watch方式
// gulp.task('watch', function () {
//     gulp.watch('src/**/*.scss', ['sassGO']);
//     gulp.watch('src/**/*.js', ['ConcatAndUglify']);
//     gulp.watch('build/**/*.html', ['htmlGO']);
// });
gulp.task('default', ['ConcatAndUglify', 'sassGO', 'serverGO', 'htmlGO']);
// gulp.task('default', ['ConcatAndUglify', 'sassGO', 'serverGO', 'watch']);