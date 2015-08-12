angular.module("app")
.controller "QuotesCtrl", ($scope, $stateParams, QuoteService, $modal) ->
  getQuotes = =>
    tags    = $stateParams.tags?.split(',')
    @quotes = QuoteService.filterByTags(tags)

  getQuotes()

  $scope.$on '$locationChangeSuccess', -> getQuotes()
  $scope.$watch ->
    return QuoteService.filterText
  , =>
    @filterText = QuoteService.filterText

  @viewQuote = (quote) ->
    QuoteService.selectedQuote = quote

    modalInstance = $modal.open
      animation: true
      templateUrl: 'quotes/view.quote.tpl.jade'
      controller: 'SingleQuoteCtrl'
      size: 10,

    modalInstance.result.then (selectedItem) ->
      $scope.selected = selectedItem
    , ->
      console.log 'Modal dismissed at: ' + new Date()

  return

.controller 'SingleQuoteCtrl', ($scope, QuoteService) ->
  @quote = QuoteService.selectedQuote
  @updateQuote = (field, update) ->
    changes = {id: @quote._id, field:field, update:update}
    QuoteService.updateQuote(changes)
  return











  return
