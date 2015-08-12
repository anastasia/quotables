watch_this = [

  '!./app/web/router.coffee',
  './app/web/**/*.coffee',
  './app/server/**/*.coffee',
  './app/web/**/*.jade',
  './app/web/styles/**/*.styl'

]

module.exports = (grunt) ->
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json')

    coffee:
      compile:
        files:
          './app/web/main-app.js':[
            './app/web/**/*.coffee'
            '!./app/server/**.coffee' ]
    html2js:
      options:
        jade:
          doctype: 'html'

      app:
        options:
          base: 'app/web/views'
        src: ['./app/web/views/**/*.tpl.jade'],
        dest: './app/web/views/templates.js'

    watch:
      compile:
        files: watch_this
        tasks: ['coffee', 'html2js', 'stylus', 'concat']

    concat:
      dist:
        src: [
          'bower_components/angular/angular.min.js'
          'bower_components/angular-bootstrap/ui-bootstrap.min.js'
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
          'bower_components/angular-ui-router/release/angular-ui-router.min.js'
          'bower_components/restangular/src/restangular.js'
          'bower_components/lodash/lodash.min.js'
        ]
        dest: "./app/web/dist/built.js"
      app:
        src: ['./app/web/views/templates.js', './app/web/main-app.js']
        dest: './app/web/app.js'

    stylus:
      compile:
        options:
          compress: true
        files: './app/web/styles.css':'./app/web/styles/*.styl'
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-html2js')
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('default', ['coffee', 'html2js', 'concat', 'stylus', 'watch'])
