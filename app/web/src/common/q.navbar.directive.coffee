angular.module("app")
.directive "qNavbar", ->
  templateUrl: 'partials/navbar.tpl.jade'
  controller: ->
    console.log "qNavbar"
