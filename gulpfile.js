var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    jade        = require('gulp-jade'),
    imagemin    = require('gulp-imagemin'),
    uglify      = require('gulp-uglify'),
    plumber     = require('gulp-plumber');


/*
  Compile files from assets/_sass/ to _build/css/
 */
gulp.task('sass', function () {
    return gulp.src('assets/_sass/**/*.sass')
      .pipe(sass({
          outputStyle: 'compressed',
          includePaths: ['sass'],
          onError: browserSync.notify
      }))
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest('_build/css'))
      .pipe(browserSync.reload({stream:true}));
});
/*
  Compile Jade files from _jade/ to _build/
*/
gulp.task('jade', function(){
  return gulp.src('_jade/**/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('_build/'))
    .pipe(browserSync.reload({stream: true}));
});

/*
  javascript files uglify from assets/_js/ to _build/js/
*/
gulp.task('uglify', function(){
  gulp.src('assets/_js/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("_build/js/"));
});

/*
  Image Compression from assets/_image/ to _build/img/
*/
gulp.task('image', function(){
  gulp.src('assets/_image/*')
    .pipe(imagemin())
    .pipe(gulp.dest('_build/img'));
});

/*
  Browser Sync, launch the Server
 */
gulp.task('browser-sync', ['jade','sass','uglify','image'], function() {
    browserSync({
        server: {
            baseDir: '_build'
        }
    });
});

/*
  Watch scss files for changes & recompile
  Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/_sass/**/*.sass', ['sass']);
    gulp.watch('_jade/**/*.jade', ['jade']);
    gulp.watch('assets/_js/**/*.js', ['uglify']);
    gulp.watch('assets/_image/*', ['image']);
});

/*
  Default task, running just `gulp` will compile the sass,
  compile the Jade, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
