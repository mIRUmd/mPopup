module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [ 'dist/*.css','dist/*.js']
                }
            }
        },
        autoprefixer: {
            options : {
                browsers: ['last 10 versions', 'ie 7', 'ie 8']
            },
            css_file: {
                src: 'dev/<%= pkg.title %>.css',
                dest: 'dist/<%= pkg.title %>.css'
            }

        },
        csslint: {
            options: {
                "box-sizing": false,
                "box-model": false
            },
            src: 'dev/<%= pkg.title %>.css'
        },
        cssmin: {
            compress: {
                files: {
                    'dist/<%= pkg.title %>.min.css': ['dev/<%= pkg.title %>.css']
                }
            }
        },
        uglify: {
            minify: {
                files: {
                    'dist/<%= pkg.title %>.jquery.min.js': ['dev/<%= pkg.title %>.jquery.js']
                }
            },
            beautify: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: {
                    'dist/<%= pkg.title %>.jquery.js': ['dev/<%= pkg.title %>.jquery.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                reporterOutput: ''
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint','autoprefixer:css_file', 'uglify:minify', 'uglify:beautify', 'cssmin:compress', 'csslint', 'usebanner']);

};