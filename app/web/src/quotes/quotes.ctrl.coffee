angular.module("app")
.controller "QuotesCtrl", ($scope, $stateParams, $window, QuoteService, $modal, TagService, $http) ->
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
      animation: false
      templateUrl: 'quotes/view.quote.tpl.jade'
      controller: 'SingleQuoteCtrl'
      size: 10,

    modalInstance.result.then (selectedItem) ->
      $scope.selected = selectedItem
    , ->
      console.log 'Modal dismissed at: ' + new Date()

  @openDeleteModal = (quote) ->
    modalInstance = $modal.open
      animation: false
      template: """
        <div>DELETE</div>
        <div>
          <button class="btn btn-primary" ng-click="$scope.deleteQuote(quote)">
           YES
          </button>
          <button class="btn btn-default">
           NO
          </button>
      """
      size: 10,

    modalInstance.result.then (selectedItem) ->
      $scope.selected = selectedItem
    , ->
      console.log 'Modal dismissed at: ' + new Date()

  @deleteQuote = (quote) ->
    remove = confirm "Delete?"
    if remove
      $http
        .post("/quotes/#{quote._id}")
        .then ->
          $window.location.reload()
    else
      return

  @getClass = (quote) ->
    date = new Date quote.created_at
    s = date.getTime()
    return "five" if s % 6 == 0
    return "one" if s % 7 == 0
    return "three" if s % 3 == 0
    return "four" if s % 5 == 0
    return "two" if s % 2 == 0
    return "five"






  return



.controller 'SingleQuoteCtrl', ($scope, QuoteService) ->
  @quote = QuoteService.selectedQuote
  @updateQuote = (field, update) ->
    changes = {id: @quote._id, field:field, update:update}
    QuoteService.updateQuote(changes)
  return











  return
