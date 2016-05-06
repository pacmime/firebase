
/* 
 http://www.sitepoint.com/writing-awesome-build-script-grunt/

 https://github.com/jlengstorf/hyper-optimized-workflow/blob/master/Gruntfile.js

 */
module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    var sourceFiles = [
        "src/common.js",
        "src/character/character.js",
        "src/home/home.js",
        "src/main.js",
        'assets/templates.js'
    ];


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 8888
                }
            }
        },

        watch: {    

            //monitor stylesheets and rebuild them upon changes to them
            less: {
                files: ['src/**/*.less', 'static/bower/**/*.less'],
                tasks: ['less', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },

            //monitor js files and reload if changed
            js: {
                files: ['src/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },

            //monitor html templates and reload if changed
            html: {
                files: ['src/**/*.html'],
                tasks: ['ngtemplates'],
                options: {
                    livereload: true
                }
            }
        },

        concat: {
            options: {
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed
            },
            main: {
                src: sourceFiles,
                dest: 'assets/sob.js'
            }
        },

        uglify: {
            options: {
                mangle: false   /* needed for angular to work */
            },
            dist: {
                files: {
                    'assets/sob.min.js': 'assets/sob.js'
                }
            }
        },

        ngtemplates:  {
            app:        {
                cwd: 'src',
                src: ['**/*.html'],
                dest: 'assets/templates.js'
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/js/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                ignores: [
                    'src/js/plugins/*.js'
                ]
            }
        }

    });


    



    //invoke for development usage
    grunt.registerTask('dev', [
        'jshint',               //validate js
        'connect:server',   
        'watch'                 //monitor files for changes
    ]);

    //invoke for distro building
    grunt.registerTask('default', [
        'jshint',               //validate js
        'ngtemplates',          //minify templates into single file
        'concat',               //build minified js files
        'uglify'
    ]);

};
