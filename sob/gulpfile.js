
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
    cleanCSS = require('gulp-clean-css'),
    livereload  = require('gulp-livereload');

//~0.3.1

const autoprefix = new autoprefixer({ 
    browsers: [
        "iOS >= 7", 
        "Chrome >= 30", 
        "Explorer >= 11", 
        "last 2 Edge versions", 
        "Firefox >= 20",
        "Safari >= 9"
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
            module: 'app',
            standalone: false
            // ,
            // path: function (path, base) {
            //     return 'modules/' + path.replace(base,'');
            // }
        }))
        .pipe(gulp.dest('assets/js'))
        .pipe(notify('Compiled Angular Templates'));
});



gulp.task('js', 'Concat, Ng-Annotate, Uglify JavaScript into a single file', function() {

    //build dependency JS file
    gulp.src([
            "bower_components/jquery/dist/jquery.min.js",
            "bower_components/bootstrap/dist/js/bootstrap.min.js",
            "bower_components/angular/angular.min.js",
            "bower_components/angular-route/angular-route.min.js",
            "bower_components/angular-sanitize/angular-sanitize.js",
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "bower_components/firebase/firebase.js",
            "src/firebase.config.js",
            "bower_components/angularfire/dist/angularfire.min.js"
        ])
        .pipe(concat('dependencies.js'))
        // .pipe(babel({presets: ["es2015"]}))
        // .pipe(uglify()).on('error', notify.onError("Error: <%= error.message %>"))
        // .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest('assets/js/'))
        .pipe(notify('Compiled Dependencies JavaScript'));

    
    gulp.src([
            "src/common.js",
            "src/v2/character.js",
            "src/v2/abilities/abilities.js",
            "src/v2/clothing/clothing.js",
            "src/v2/items/items.js",
            "src/v2/sermons/sermons.js",
            "src/v2/mutations/mutations.js",
            "src/v2/sidebag/sidebag.js",
            "src/v2/attacks/attacks.js",
            "src/v2/loot/loot.js",
            "src/home/home.js",
            "src/main.js"
        ])
        .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(babel({presets: ["es2015"]}))
        .pipe(ngAnnotate()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(uglify()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({extname: ".min.js"}))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(notify('Compiled JavaScript'));
});

gulp.task('less', 'Compile less into a single file.', function() {
    gulp.src(
        [
            'src/app.less', 
            'src/flex.less', 
            'src/sprites.less',
            'src/v2/layout.less',
            'src/v2/stats.less',
            'src/v2/**/*.less'
        ])
        .pipe(concat(pkg.name + '.less'))
        //must write to public before processing for paths to work
        .pipe(gulp.dest('assets/css/')) 
        .pipe(less({plugins: [autoprefix]}))
        .on("error", notify.onError({message: 'LESS compile error: <%= error.message %>'}))
        .pipe(cleanCSS({}))
        .pipe(gulp.dest('assets/css/'))
        .pipe(notify('Compiled styles'))
        .pipe(livereload());
});

gulp.task('assets', function() {
    gulp.src( [ 'bower_components/bootstrap/fonts/*.*' ])
        .pipe(gulp.dest('assets/fonts'));   
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.js', ['jshint']);
});



gulp.task('default', ['js', 'html', 'less', 'assets']);

gulp.task('dev', ['default', 'watch']);



