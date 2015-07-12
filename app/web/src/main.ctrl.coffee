angular.module("app")
.controller "MainCtrl", (QuoteService) ->
  console.log "MainCtrl"
  @quotes = QuoteService.quotes
  return
