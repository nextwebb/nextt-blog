// including plugins
var gulp = require('gulp')
var minifyCSS = require('gulp-clean-css')
var autoprefixer = require('gulp-autoprefixer')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var path = require('path')

gulp.task('css', function(){
    return gulp.src(
            [
                './public/css/bootstrap.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('style', ['css'], function(){})


gulp.task('js', function(){
    return gulp.src(
            [
                './public/js/jquery.js'
            ]
        )
        .pipe(gp_concat('vendor.min.js'))
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'))
});


gulp.task('watch', function() {
    gulp.watch(['./src/*/**.js', './src/*/*/**.js', './public/js/**.js'], ['es6-es5'])
})

gulp.task('prod', ['style', 'js'], function(){})

gulp.task('default', ['prod'], function(){})
