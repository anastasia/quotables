angular.module("app")
.controller "QuotesCtrl", ($scope, $stateParams, QuoteService) ->
  getQuotes = =>
    tags    = $stateParams.tags?.split(',')
    @quotes = QuoteService.filterByTags(tags)

  getQuotes()

  $scope.$on '$locationChangeSuccess', -> getQuotes()
  $scope.$watch ->
    return QuoteService.filterText
  , =>
    @filterText = QuoteService.filterText

  @viewQuote = (id) ->
    @quoteViewed = if @quoteViewed == id then null else id

  return
