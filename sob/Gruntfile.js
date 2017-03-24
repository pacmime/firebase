
/* 
 http://www.sitepoint.com/writing-awesome-build-script-grunt/

 https://github.com/jlengstorf/hyper-optimized-workflow/blob/master/Gruntfile.js

 */
module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    var sourceFiles = [
        "src/common.js",
        "src/character/character.js",
        "src/character/abilities/abilities.js",
        "src/character/clothing/clothing.js",
        "src/character/items/items.js",
        "src/character/sermons/sermons.js",
        "src/character/mutations/mutations.js",
        "src/home/home.js",
        "src/main.js",
        'assets/templates.js'
    ];

    var v2SourceFiles = [
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
            },
            v2: {
                src: v2SourceFiles,
                dest: 'assets/sob-v2.js'
            }
        },

        uglify: {
            options: {
                mangle: false   /* needed for angular to work */
            },
            dist: {
                files: {
                    'assets/sob.min.js': 'assets/sob.js',
                    'assets/sob-v2.min.js': 'assets/sob-v2.js'
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
