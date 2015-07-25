angular.module("app")
.directive "qNavbar", ->
  templateUrl: 'partials/navbar.tpl.jade'
  controllerAs: 'nav'
  controller: ($scope, QuoteService, $stateParams, TagService) ->
    @searchval   = ''
    @searchPlaceholder = "SEARCH"
    @clearSearch = ->
      @searchval = ''
      TagService.selectedTags = []
      @filterByText('')

    $scope.$watch ->
      return QuoteService.filterText
    , =>
      @searchval = QuoteService.filterText

    $scope.$watch ->
      return TagService.selectedTags
    , =>
      @searchval = @searchval + TagService.selectedTags.join(' ')

    @filterByText   = ->
      QuoteService.filterText = @searchval

    @toggleNewQuote = ->
      @addingQuote             = !@addingQuote
      @searchPlaceholder       = if @addingQuote then "ADD A QUOTE" else "SEARCH"
      QuoteService.addingQuote = @addingQuote

    return
