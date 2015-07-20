angular.module("app")
.controller "QuotesCtrl", ($scope, $stateParams, QuoteService) ->
  getQuotes = =>
    tags    = $stateParams.tags?.split(',')
    @quotes = QuoteService.filterQuotesByTags(tags)
  getQuotes()

  $scope.$on '$locationChangeSuccess', -> getQuotes()

  return
