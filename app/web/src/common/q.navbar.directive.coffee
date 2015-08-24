angular.module("app")
.directive "qNavbar", ->
  templateUrl: 'partials/navbar.tpl.jade'
  controllerAs: 'nav'
  controller: ($scope, QuoteService, $stateParams, TagService) ->
    @searchval   = ''
    @selectedTags = []
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
      @selectedTags = TagService.selectedTags

    @removeTag = (index) ->
      TagService.selectedTags.splice(index, 1)

    @filterByText   = ->
      QuoteService.filterText = @searchval

    @toggleNewQuote = ->
      @addingQuote             = !@addingQuote
      @searchPlaceholder       = if @addingQuote then "ADD A QUOTE" else "SEARCH"
      QuoteService.addingQuote = @addingQuote

    @updateWithTag = (tag) ->
      TagService.updateWithTag(tag)

    @getClass = (tag) ->
      TagService.getClass(tag)

    return
