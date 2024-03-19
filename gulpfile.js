var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var fileInclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();

// CLEAN
gulp.task('clean', function() {
  return gulp.src('dist', {read: false, allowEmpty: true})
    .pipe(clean());
});

// COPY IMAGES
gulp.task('copy-images', function() {
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images'));
});

// LESS
gulp.task('less', function() {
  return gulp.src('src/styles/theme.less')
    .pipe(less())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// FILE INCLUDE
gulp.task('file-include', function() {
  return gulp.src(['src/*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist'));
});

// RELOAD
gulp.task('reload', function(done){
  browserSync.reload();
  done();
})

// SERVE
gulp.task('serve', function(done) {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('src/styles/**/*.less', gulp.series('less'));
  gulp.watch('src/**/*.html', gulp.series('file-include', 'reload'));
  done();
});

// DEFAULT
gulp.task('default', gulp.series(
  'clean',
  'copy-images',
  'less',
  'file-include',
  'serve'
));
