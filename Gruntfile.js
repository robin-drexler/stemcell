module.exports = function(grunt){
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concurrent: {
        watch_serve_reload: ['server', 'watch'],
        options: {
                logConcurrentOutput: true
            }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'build'
        }
      }
    },
    watch: {
      options: {
        livereload: true,  
      },
      jade: {
        files: ['src/**/*.jade'],
        tasks: ['jade'],
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['log'],
      },
      scripts: {
        files: [ 'src/**/*.js'],
        tasks: ['jshint', 'copy:js'],
        // options: {
        //   spawn: false,
        // },
      },
      coffee: {
        files: [ 'src/**/*.coffee' ],
        tasks: [ 'coffee' ],
      },
      css: {
        files: 'src/**/*.sass',
        tasks: ['sass'],
      },
      reload: {
        files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.css', 'src/**/*.{png,jpg}'],
        tasks: 'tinylr-reload'
      },
      data: {
        files: 'data/*.json',
        tasks: 'copy:data'
      },
    },
    sass: {
      dist: {
        options: {
                style: 'expanded',
                lineNumbers: true,
                compass: true,
        },
        files: [{
          expand: true,
          cwd: 'src/assets/stylesheets',
          src: ['*.sass'],
          dest: 'build',
          ext: '.css'
        }],
        // files: {
        //   'src/proto.css': 'src/proto.sass'
        // }

      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [ {
          cwd: 'src',
          dest: 'build',
          expand: true,
          src: '**/*.jade',
          ext: '.html',
        } ]
      }
    },
    copy: {

      data: {
        src: 'data/data.json',
        dest: 'build/data.json'
      },

      bower_components: {
        expand: true,
        cwd: 'bower_components',
        dest: 'build/bower_components',
        src: '**/*',
      },

      js: {
        expand: true,
        cwd: 'src/assets/javascripts',
        src: '**/*.js',
        dest: 'build/',
        flatten: true,
        filter: 'isFile',
      },

      normalize : {
        // needs to be copied into an scss file to enable import :(
        src: 'bower_components/normalize-css/normalize.css',
        dest: 'src/assets/stylesheets/normalize.scss'
      }
    },
    jshint: {
      all: [ 'Gruntfile.js', 'src/**/*.js' ]
    },

    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'src/assets/javascripts',
        src: ['**/*.coffee'],
        dest: 'build',
        ext: '.js',
      },
  },

  });

  grunt.registerTask('log', 'Log some stuff.', function () {
    grunt.log.write('Logging some stuff...').ok();
  });
  grunt.registerTask('inital_compile', [ 'sass', 'jade', 'coffee', 'copy' ]);
  grunt.registerTask('server', [ 'connect:server:keepalive' ]);
  grunt.registerTask('default', [ 'copy:normalize', 'inital_compile', 'concurrent:watch_serve_reload' ]);
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('tiny-lr');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
};
