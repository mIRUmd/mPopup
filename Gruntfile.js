module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n\n\n',
        cssmin: {
            compress: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'dist/<%= pkg.title %>.min.css': ['dev/<%= pkg.title %>.css']
                }
            }
        },
        uglify: {
            minify: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'dist/<%= pkg.title %>.jquery.min.js': ['dev/<%= pkg.title %>.jquery.js']
                }
            },
            beautify: {
                options: {
                    banner: '<%= banner %>',
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
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint', 'uglify:minify', 'uglify:beautify', 'cssmin:compress']);

};