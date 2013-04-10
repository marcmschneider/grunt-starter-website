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
    path: pathConfig,
    //pkg: grunt.file.readJSON('package.json'),
    watch: {
      compass: {
        files: ['<%= path.app %>/css/*.{scss,sass}'],
        tasks: ['compass']
      },
      jade: {
        files: ['<%= path.app %>/**/*.{jade,md,markdown}'],
        tasks: ['jade:dev', 'livereload']
      },
      handlebars: {
        files: ['<%= path.app %>/js/app/templates/**/*.hbs'],
        tasks: ['handlebars:dev']
      },
      livereload: {
        files: [
          '<%= path.app %>/**/*.html',
          '{.tmp,<%= path.app %>}/css/*.css',
          '{.tmp,<%= path.app %>}/js/**/*.js',
          '<%= path.app %>/img/*.{png,jpg,jpeg}'
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
      dist: ['.tmp', '<%= path.dist %>/*'],
      server: '.tmp',
      templates: '<%= path.app %>/js/app/templates/**/*.js'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= path.app %>/js/**/*.js',
        '!<%= path.app %>/js/vendor/**/*.js'
      ]
    },
    compass: {
      options: {
        config: 'config/compass.rb',
        require: ['susy', 'modular-scale'],
        sassDir: '<%= path.app %>/css',
        cssDir: '.tmp/css',
        imageDir: '<%= path.app %>/css/img',
        relativeAssets: false
      },
      dist: {
        options: {
          cssDir: '<%= path.dist %>/css',
          outputStyle: 'compressed'
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
          baseUrl: '<%= path.app %>/js',
          mainConfigFile: '<%= path.app %>/js/main.js',
          out: '<%= path.dist %>/js/main.js',
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
          '<%= path.dist %>/js/vendor/requirejs/require.js' : ['<%= path.app %>/js/vendor/requirejs/require.js'],
          '<%= path.dist %>/js/vendor/modernizr/modernizr.js' : ['<%= path.app %>/js/vendor/modernizr/modernizr.js']
        }
      }
    },
    imagemin: {
      img: {
        files: [{
          expand: true,
          cwd: '<%= path.app %>/img',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= path.dist %>/img'
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: '<%= path.app %>/css/img',
          src: ['**/*.{png,jpg,jpeg}', '!sprites/**/*.{png,jpg,jpeg}'],
          dest: '<%= path.dist %>/css/img'
        }]
      }
    },
    jade: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= path.app %>',
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
          cwd: '<%= path.app %>',
          src: ['**/*.jade', '!layout/*.jade'],
          dest: '<%= path.dist %>/',
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
    handlebars: {
      dev: {
        options: {
          namespace: false,
          amd: true
        },
        files: [{
          expand: true,
          cwd: '<%= path.app %>/js/app/templates/',
          src: '**/*.hbs',
          dest: '.tmp/js/app/templates',
          ext: '.js'
        }]
      },
      dist: {
        options: {
          namespace: false,
          amd: true
        },
        files: [{
          expand: true,
          cwd: '<%= path.app %>/js/app/templates/',
          src: '**/*.hbs',
          dest: '<%= path.app %>/js/app/templates',
          ext: '.js'
        }]
      }
    },
    copy: {
      html: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= path.app %>',
          dest: '<%= path.dist %>',
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
          cwd: '<%= path.app %>',
          dest: '<%= path.dist %>',
          src: [
            'img/**/*',
            'css/img/**/*',
            '!css/img/sprites/*',

            'css/fonts/**/*',
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
    },
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: [{
          src: [
            '<%= path.dist %>/css/**/*.css',
            '<%= path.dist %>/js/**/*.js',
            '<%= path.dist %>/css/fonts/**/*',
            '<%= path.dist %>/css/img/**/*.{png,jpg,jpeg,gif,webp}'
          ]
        }]
      }
    },
    useminPrepare: {
      html: '<%= path.dist %>/index.html',
      options: {
        dest: '<%= path.dist %>/'
      }
    },
    usemin: {
      html: ['<%= path.dist %>/*.html'],
      css: ['<%= path.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['dist']
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'host',
          port: 21,
          authKey: 'key'
        },
        src: 'dist/',
        dest: '/dest',
        exclusions: ['dist/**/.DS_Store']
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
      'handlebars:dev',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'jshint',
    'handlebars:dist',
    'requirejs',
    'clean:templates',
    'uglify',
    'compass:dist',
    // 'imagemin:img',
    // 'imagemin:css',
    'jade:dist',
    'copy:html',
    'copy:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'ftp-deploy'
  ]);

  grunt.registerTask('default', ['server']);
};