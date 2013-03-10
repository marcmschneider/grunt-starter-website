'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var pathConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: pathConfig,
    //pkg: grunt.file.readJSON('package.json'),
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/css/*.{scss,sass}'],
        tasks: ['compass']
      },
      jade: {
        files: ['<%= yeoman.app %>/**/*.jade'],
        tasks: ['jade:dev', 'livereload']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/**/*.html',
          '{.tmp,<%= yeoman.app %>}/css/*.css',
          '{.tmp,<%= yeoman.app %>}/js/**/*.js',
          '<%= yeoman.app %>/img/*.{png,jpg,jpeg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/js/**/*.js',
        '!<%= yeoman.app %>/js/vendor/**/*.js'
      ]
    },
    compass: {
      options: {
        config: 'config/compass.rb',
        require: ['susy', 'modular-scale'],
        sassDir: '<%= yeoman.app %>/css',
        cssDir: '.tmp/css',
        imageDir: '<%= yeoman.app %>/css/img',
        //fontsDir: '<%= yeoman.app %>/css/fonts',
        relativeAssets: false
      },
      dist: {
        options: {
          cssDir: '<%= yeoman.dist %>/css'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: 'app/js',
          mainConfigFile: 'app/js/main.js',
          out: 'dist/js/main.js',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          optimize: 'uglify'
        }
      }
    },
    uglify: {
      options: {

      },
      dist: {
        files: {
          '<%= yeoman.dist %>/js/vendor/requirejs/require.js' : ['<%= yeoman.app %>/js/vendor/requirejs/require.js'],
          '<%= yeoman.dist %>/js/vendor/modernizr/modernizr.js' : ['<%= yeoman.app %>/js/vendor/modernizr/modernizr.js']
        }
      }
    },
    imagemin: {
      img: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/img'
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/css/img',
          src: ['**/*.{png,jpg,jpeg}', '!sprites/**/*.{png,jpg,jpeg}'],
          dest: '<%= yeoman.dist %>/css/img'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          removeCDATASectionsFromCDATA: true,
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    jade: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.jade', '!layout/*.jade'],
          dest: '.tmp/',
          ext: '.html'
        }],
        options: {
          pretty: true,
          data: {
            debug: true
          }
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.jade', '!layout/*.jade'],
          dest: 'dist/',
          ext: '.html'
        }],
        options: {
          pretty: true,
          data: {
            debug: false
          }
        }
      },
    },
    copy: {
      html: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '**/*.html',
            '!js/vendor/**/*.html'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'robots.txt',
            'humans.txt',
            'crossdomain.xml',
            '.htaccess',
            'favicon.ico',
            'apple-touch-icon-57x57-precomposed.png',
            'apple-touch-icon-72x72-precomposed.png',
            'apple-touch-icon-114x114-precomposed.png',
            'apple-touch-icon-144x144-precomposed.png',
            'apple-touch-icon-precomposed.png',
            'apple-touch-icon.png'
          ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jade:dev',
      'compass:server',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'requirejs',
    'uglify',
    'compass:dist',
    'imagemin:img',
    'imagemin:css',
    'jade:dist',
    'copy:html',
    'htmlmin',
    'copy:dist'
  ]);

  grunt.registerTask('default', ['bower']);
};