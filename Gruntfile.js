'use strict';
var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    grunt.initConfig({

        watch: {
            all: {
                files: ['<%= jshint.all %>'],
                tasks: ['jshint', 'nodeunit']
            },
            my_livereload: {
                files: ['/css/**/*.css', 'index.html'],
                options: {
                    livereload: true
                }
            }
        },
        imagemin: {                          // Task
            static: {                          // Target
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
                files: {                         // Dictionary of files
                    'img/spritesheet.png': 'img/spritesheet.png', // 'destination': 'source'
                    'dist/img.jpg': 'img/**/*.jpg'
                }
            }
            //dynamic: {                         // Another target
            //    files: [{
            //        expand: true,                  // Enable dynamic expansion
            //        cwd: 'src/',                   // Src matches are relative to this path
            //        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            //        dest: 'dist/'                  // Destination path prefix
            //    }]
            //}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('test', ['watch:my_livereload']); //livereload

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('new', ['imagemin']); // optimization images
};



