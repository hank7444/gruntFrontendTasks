module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            normal: {
                files: ['html/**/*.html', 'css/**/*.css', 'js/**/*.js'],

                // NOTE: vlidation need to be after others, if not, it's will unavliable when you save .css or .js, and
                // back to save .html.
                tasks: [
                    'cssbeautifier:normal', 'csslint:normal',
                    'jsbeautifier:normal', 'jshint:normal',
                    'prettify:normal', 'validation:normal',
                ],
                options: {
                    nospawn: true,
                },
            },
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
                reset: true, //grunt.option('reset') 
                stoponerror: true,
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
                    'Element title must not be empty.'
                ]
            },
            normal: {
                src: 'none/none.html'
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
            normal: '',
            options: {
                indent: '    ',
                openbrace: 'end-of-line',
                autosemicolon: false
            }
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


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-jsbeautifier'); // js prettify
    grunt.loadNpmTasks('grunt-contrib-jshint'); // js hint
    grunt.loadNpmTasks('grunt-prettify'); // html prettify
    grunt.loadNpmTasks('grunt-html-validation'); // html hint
    grunt.loadNpmTasks('grunt-cssbeautifier'); // css prettify
    grunt.loadNpmTasks('grunt-contrib-csslint'); // css hint

    // Default task(s).
    //grunt.registerTask('default', ['uglify']);

    var htmlNonePath = 'none/none.html';
    var defaultNonepath = 'notexist/*.notexist';
    var targetHash = {

        // 美化格式, 驗證css, js, html
        'normal': [{
            name: 'validation.normal.src',
            path: htmlNonePath
        }, {
            name: 'prettify.normal.src',
            path: defaultNonepath
        }, {
            name: 'prettify.normal.dest',
            path: defaultNonepath
        }, {
            name: 'cssbeautifier.normal',
            path: defaultNonepath
        }, {
            name: 'csslint.normal.src',
            path: defaultNonepath
        }, {
            name: 'jsbeautifier.normal.src',
            path: defaultNonepath
        }, {
            name: 'jshint.normal.src',
            path: defaultNonepath
        }],
        'sass': [],
        'test': []
    };

    var tasksInit = (function() {

        var setTaskConfig = function(filePathUseTasksNameAry, tasksAry, filepath) {
            tasksAry.forEach(function(task) {

                if (filePathUseTasksNameAry[task.name]) {
                    grunt.log.writeln('task.name: ' + task.name);
                    grunt.config(task.name, filepath);
                } else {
                    grunt.config(task.name, task.path);
                }
            });
        };
        var fileTypeHash = {

            'html': {
                'validation.normal.src': true,
                'prettify.normal.src': true,
                'prettify.normal.dest': true
            },
            'css': {
                'cssbeautifier.normal': true,
                'csslint.normal.src': true,
            },
            'js': {
                'jsbeautifier.normal.src': true,
                'jshint.normal.src': true,
            }
        };
        return function(extension, tasksAry, filepath) {

            var filePathUseTasksNameAry = fileTypeHash[extension];
            setTaskConfig(filePathUseTasksNameAry, tasksAry, filepath);
        };
    })();


    // 只對目前變動的檔案作處理
    grunt.event.on('watch', function(action, filepath, target) {

        var target = target;
        var extension = filepath.substr(filepath.lastIndexOf('.') + 1);
        var data = targetHash[target];
        tasksInit(extension, data, filepath);
    });

};
