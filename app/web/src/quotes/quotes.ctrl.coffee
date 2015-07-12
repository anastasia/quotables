angular.module("app")
.controller "QuotesCtrl", (QuoteService) ->
    @quotes = QuoteService.quotes
    console.log 'QuotesCtrl', @quotes
    return
