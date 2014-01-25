module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  
  // Project configuration.
  grunt.initConfig({  
   "uglify": {  
      lib_js: {
        files: {
          'public/build/js/lib.min.js': [ 'public/build/js/lib.js']
        }
      },
      app_js: {
        files: {
          'public/build/js/app.min.js': [ 'public/build/js/app.js']
        }
      }
    },
    "concat": {
      html: {
        src: [
          'public/tmpl/user-tmpl.html',
          'public/tmpl/job-tmpl.html',
          'public/tmpl/layout-tmpl.html'
            ],
        dest: 'public/build/tmpl/app.html'
      },
      lib_js: {
        src: [
          'public/lib/bootstrap/js/modal.js',
          'public/lib/bootstrap/js/dropdown.js',
          'public/lib/bootstrap/js/button.js',
          'public/lib/kendoui/kendo.core.min.js',
          'public/lib/kendoui/kendo.data.min.js',
          'public/lib/kendoui/kendo.binder.min.js',
          'public/lib/kendoui/kendo.validator.min.js',
          'public/lib/kendoui/kendo.router.min.js',
          'public/lib/kendoui/kendo.view.min.js',
          'public/lib/kendoui/kendo.selectable.min.js',
          'public/lib/kendoui/kendo.userevents.min.js',
          'public/lib/kendoui/kendo.listview.min.js',
          'public/lib/console.js',
        ],
        dest: 'public/build/js/lib.js'
      },
      app_js: {
        src: [

          'public/js/utils/kendo.bindings.custom.js',
          'public/js/utils/template-loader.js',
          'public/js/utils/oauth-window.js',
          'public/js/utils/transport.js',
          'public/js/utils/transport.websocket.js',
          //dd'public/js/auth.js',
          'public/js/app.js'
        ],
        dest: 'public/build/js/app.js'
      }
    },
    "watch": {
      concat_html: {
        files: ['Gruntfile.js', 'public/tmpl/**/*.html'],
        tasks: ['concat:html'],
        options: {
          interrupt: true
        }
      },
      concat_js: {
        files: ['Gruntfile.js', 'public/lib/**/*.js', 'public/js/**/*.js'],
        tasks: ['concat:lib_js', 'concat:app_js'],
        options: {
          interrupt: true
        }
      },
      uglify: {
        files: ['public/build/js/lib.js', 'public/build/js/app.js'],
        tasks: ['uglify:app_js', 'uglify:lib_js'],
        options: {
          interrupt: true
        }
      },
      less: {
        files: ['Gruntfile.js', 'less/**/*.less'],
        tasks: ['less'],
        options: {
          interrupt: true
        }
      },
      all:{
        files: ['Gruntfile.js', 'public/tmpl/**/*.html', 'public/lib/**/*.js', 'public/js/**/*.js', 'less/**/*.less'],
        tasks: ['concat:html', 'concat:lib_js', 'concat:app_js','less'],
        options: {
          interrupt: true
        }
      }
    },
    "nodeunit": {
        all: ['test/*-test.js']
    },
    "less": {
      development: {
        files: {
          "public/build/css/app.css": "less/app.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "public/build/css/app.min.css": "less/app.less",
        }
      }
    }
  });

  grunt.registerTask('default', ['nodeunit']);
};
