'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {
          'app/css/vulture.css': 'app/sass/main.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/css/vulture.css': 'app/sass/main.scss'
        }
      }
    },
    watch: {
      files: ['app/sass/*'],
      tasks: ['sass:dev']
    }
  });

  grunt.registerTask('default', ['sass:dist']);

}
