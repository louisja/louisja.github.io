let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let pug = require('gulp-pug');

let browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');

const conf = {
    src: 'src',
    dist: 'docs',
    scss: 'scss',
    scssMain: 'app',
    css: 'css',
    imgs: 'imgs',
    fonts: 'fonts',
    views: 'views',
    pugVariables: {
        title: 'BikeBubl Service',
        brandName: 'BikeBubl',
        topMenu: ['home', 'request a quote', 'bikebubl club', 'stripe', "what's new", 'about us'],
        homePageMenu: ['our mission', 'bukebubl club', 'request a quote', "what's new", 'work with us', 'contact us'],
        footerMenu: ['about', 'contact', 'terms and conditions', 'privacy policy'],
        followUs: 'Follow Us On',
        copyright: ' 2018 All Rights Reserved'
    }
};

gulp.task('fonts', function () {
    return gulp.src(`${conf.src}/${conf.fonts}/**.*`)
        .pipe(gulp.dest(`${conf.dist}/${conf.fonts}/`));
});

gulp.task('images', () =>
    gulp.src(`${conf.src}/${conf.imgs}/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${conf.dist}/${conf.imgs}`))
);

gulp.task('views', () => {
    return gulp.src(`${conf.src}/${conf.views}/[^_]*.pug `)
        .pipe(pug({
            locals: conf.pugVariables,
            pretty: true
        }))
        .pipe(gulp.dest(`${conf.dist}`));
});

gulp.task('reload', () => {
    return gulp.src('')
        .pipe(browserSync.reload );
});

gulp.task('scss', () => {
    return gulp.src(`${conf.src}/${conf.scss}/${conf.scssMain}.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${conf.dist}/${conf.css}`));
});

gulp.task('watch', function () {
    gulp.watch(`${conf.src}/${conf.scss}/**/*.scss`, gulp.series('scss')).on('change', browserSync.reload);
    gulp.watch(`${conf.src}/${conf.views}/**.pug`, gulp.series('views')).on('change', browserSync.reload);
    gulp.watch(`${conf.src}/${conf.fonts}/*`, gulp.series('fonts')).on('change', browserSync.reload);
    gulp.watch(`${conf.src}/${conf.imgs}/*`, gulp.series('images')).on('change', browserSync.reload);
});

gulp.task('default', () => {
// gulp.task('default', gulp.series('fonts', 'views', 'scss', 'images', 'watch'), () => {
    browserSync({
        server: {
            baseDir: conf.dist
        },
        tunnel: true
    });
});
