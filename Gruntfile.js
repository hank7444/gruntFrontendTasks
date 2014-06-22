module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.loadNpmTasks('grunt-focus');
    grunt.loadNpmTasks('grunt-jsbeautifier'); // js prettify
    grunt.loadNpmTasks('grunt-contrib-jshint'); // js hint
    grunt.loadNpmTasks('grunt-prettify'); // html prettify
    grunt.loadNpmTasks('grunt-html-validation'); // html hint
    grunt.loadNpmTasks('grunt-cssbeautifier'); // css prettify
    grunt.loadNpmTasks('grunt-contrib-csslint'); // css hint

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        focus: {
            normal: {
                include: ['js', 'css', 'html', 'sass']
            },
        },
        watch: {

            js: {
                options: {
                    livereload: true,
                    nospawn: true
                },
                files: ['js/**/*.js'],
                tasks: ['jsbeautifier:normal', 'jshint:normal'],
            },
            css: {
                options: {
                    livereload: true,
                    nospawn: true
                },
                files: ['css/**/*.css'],
                tasks: ['cssbeautifier:normal', 'csslint:normal']
            },
            html: {
                options: {
                    livereload: true,
                    nospawn: true
                },
                files: ['html/**/*.html'],
                tasks: ['prettify:normal', 'validation:normal']
            },
            sass: {
                options: {
                    livereload: true,
                    nospawn: true
                },
                files: ['sass/**/*.sass'],
                tasks: ['compass:sass']
            }
        },
        compass: {
            sass: {
                options: {
                    config: 'config.rb',
                    /*sassDir: 'sass',
                    cssDir: 'css'*/
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'js/**/*.js',
                        'html/**/*.html',
                        'css/**/*.css',
                        'sass/**/*.sass',
                        'sass/**/*.scss'
                    ]
                },
                options: {
                    server: {
                        baseDir: "./",
                        directory: false
                    },
                    host: "localhost",
                    ports: {
                        min: 3000,
                        max: 3100
                    },
                    debugInfo: true,
                    open: false,
                    browser: ["google chrome", "firefox"],
                    injectChanges: true,
                    notify: true,
                    watchTask: true
                },

            }

        },
        prettify: {
            options: {
                indent: 4,
                wrap_line_length: 79,
                brace_style: 'collapse',
                //unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
            },
            normal: {
                src: '',
                dest: ''
            }
        },
        validation: {
            options: {
                reset: true, //true, //grunt.option('reset') 
                stoponerror: true,
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
                    'Element title must not be empty.'
                ],
                reportpath: false,
            },
            normal: {
                src: 'html/*.html'
            }
        },
        jsbeautifier: {
            'normal': {
                src: ''
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                globals: {}
            },
            normal: {
                src: 'test/*.js'
            }
        },
        cssbeautifier: {
            options: {
                indent: '  ',
                openbrace: 'end-of-line',
                autosemicolon: false
            },
            normal: ''
        },
        csslint: {
            normal: {
                options: {
                    csslintrc: '.csslintrc'
                    // import: 10
                },
                src: ['css/**/*.css', 'html/**/*.html']
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['focus:normal']);
    grunt.registerTask('livereload', ['browserSync', 'focus:normal']);


    var targetHash = {
        'js': ['jsbeautifier.normal.src', 'jshint.normal.src'],
        'css': ['cssbeautifier.normal', 'csslint.normal.src'],
        'html': ['validation.normal.src', 'prettify.normal.src', 'prettify.normal.dest'],
        'sass': ['compass.sass']
    };
    var tasksInit = function(tasksAry, filepath) {
        tasksAry.forEach(function(task) {
            grunt.config(task, filepath);
        });
    };

    // 只對目前變動的檔案作處理
    grunt.event.on('watch', function(action, filepath, target) {

        var target = target;
        var tasksAry = targetHash[target];
        tasksInit(tasksAry, filepath);
    });
};
