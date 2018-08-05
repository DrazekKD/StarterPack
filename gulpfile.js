const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const wait = require('gulp-wait');

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('serve',['sass'], function(){
    browserSync({
        server: './'  // W jakim folderze mam szukac plików do przełądowania 
    });
    
    gulp.watch('./*.html', ['reload']); // nasłuchuje zmiany w pliku html gdy coś                                             //znajdzie odpala zdarzenie reload
    gulp.watch('./scss/*/*.scss' ,['sass']);
    gulp.watch('./scss/styles.scss' ,['sass']);
});

gulp.task('sass', function(){
    return gulp.src('./scss/styles.scss')   // wszytskie pliki z rozszezenie scss wez
    .pipe(wait( 500 )) 
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError)) // sprawdź czy nie ma z nim problemów
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./css'))              // zapisz je zamieniona na css w pliku css
    .pipe(browserSync.stream());             // refresh browser
});


gulp.task('default', ['serve']);