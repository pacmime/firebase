
var pkg         = require('./package.json'), 
    gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    ngAnnotate  = require('gulp-ng-annotate'),
    ngTemplates = require('gulp-ng-templates'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify')
    srcmaps     = require('gulp-sourcemaps'),
    less        = require('gulp-less'),
    autoprefixer= require('less-plugin-autoprefix'),
    livereload  = require('gulp-livereload');


const autoprefix = new autoprefixer({ 
    browsers: [
        "iOS >= 7", 
        "Chrome >= 30", 
        "Explorer >= 11", 
        "last 2 Edge versions", 
        "Firefox >= 20"
    ]
});



require('gulp-help')(gulp, { description: 'Help listing.' });


gulp.task('jshint', function () {
    gulp.src(['src/**/*.js'])
        .pipe(jshint({
            // laxbreak: true,
            // laxcomma: true,
            esversion: 6, //JSHint Harmony/ES6
            // eqnull: true,
            browser: true,
            jquery: true
        }))
        .pipe(jshint.reporter('default'))
        .pipe(livereload());
});



gulp.task('html', function () {
    gulp.src(['src/**/*.html'])
        .pipe(ngTemplates({
            filename: 'templates.js',
            module: 'dresden',
            standalone: false,
            path: function (path, base) {
                return path.replace(base,'');
            }
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify('Compiled Angular Templates'));
});



gulp.task('js', 'Concat, Ng-Annotate, Uglify JavaScript into a single file', function() {
    gulp.src([
            'src/common.js',
            'src/app.js', 
            'src/home/home.module.js',
            'src/home/**/*.js',
            'src/char/char.module.js',
            'src/char/**/*.js',
        ])
        .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(babel({presets: ["es2015"]}))
        .pipe(ngAnnotate()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(uglify()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({extname: ".min.js"}))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(notify('Compiled JavaScript'));
});

gulp.task('less', 'Compile less into a single file.', function() {
    gulp.src(['src/app.less', 'src/**/*.less'])
        .pipe(concat(pkg.name + '.less'))
        //must write to public before processing for paths to work
        .pipe(gulp.dest('dist/css/')) 
        .pipe(less({plugins: [autoprefix]}))
        .on("error", notify.onError({message: 'LESS compile error: <%= error.message %>'}))
        // .pipe(minifyCSS({
        //     keepBreaks: false // New rule will have break if 'true'
        // }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify('Compiled styles'))
        .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.js', ['jshint', 'js']);
    gulp.watch('src/**/*.html', ['html'])
});


gulp.task('copy', function() {
    gulp.src(["bower/bootstrap/dist/css/bootstrap.min.css"]).pipe(gulp.dest("dist/css/"));
    gulp.src(["bower/bootstrap/fonts/*.*"]).pipe(gulp.dest("dist/fonts/"));
    
    gulp.src([
            "bower/jquery/dist/jquery.min.js",
            "bower/bootstrap/dist/js/bootstrap.min.js",
            "bower/angular/angular.js",
            "bower/angular-ui-router/release/angular-ui-router.min.js",
            "bower/angular-resource/angular-resource.min.js",
            "bower/angular-animate/angular-animate.min.js",
            "bower/angular-file-upload/angular-file-upload.min.js",
            "bower/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "bower/firebase/firebase.js",
            "src/firebase.config.js",
            "bower/angularfire/dist/angularfire.min.js"
        ])
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest('dist/js/'))

    gulp.src([
        
    ]).pipe(gulp.dest("dist/js"));
});


gulp.task('default', ['js', 'html', 'less']);

gulp.task('dev', ['default', 'watch']);



