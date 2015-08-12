angular.module("app")
.directive "qNewQuote", ->
  templateUrl: 'partials/new.quote.tpl.jade'
  controllerAs: 'newquote'
  controller: ($scope, QuoteService, TagService) ->
    @shown = null

    @addQuote = ->
      obj =
        body   : @body
        author : @author
        origin : @origin
        title  : ""
        tags   : @tags

      QuoteService
        .createQuote(obj)
        .then ->
          console.log "success!"
        .catch (e) ->
          console.log "error!", e


    $scope.$watch ->
      return QuoteService.addingQuote
    , =>
      @shown = QuoteService.addingQuote
    return
