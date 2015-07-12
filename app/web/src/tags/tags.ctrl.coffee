angular.module('app')
.controller "TagsCtrl", (QuoteService) ->
  @tags = QuoteService.tags
  return
