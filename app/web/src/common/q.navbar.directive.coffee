angular.module("app")
.directive "qNavbar", ->
  templateUrl: 'partials/navbar.tpl.jade'
  controllerAs: 'nav'
  controller: (QuoteService) ->
    @searchval      = null
    @filterByText   = ->
      QuoteService.filterText = @searchval

    # @lazyTextFilter = _.debounce @filterByText, 100

    return
