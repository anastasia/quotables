angular.module('app')
.controller "TagsCtrl", ($stateParams, $state, $scope, TagService, QuoteService) ->
  @allTags    = QuoteService.tags
  TagService.selectedTags = if $stateParams.tags then $stateParams.tags.split ',' else []
  @searchTags = TagService.selectedTags
  tagIndex    = null

  $scope.$watch ->
    return TagService.selectedTags
  , =>
    @searchTags = TagService.selectedTags

  @clearTags = ->
    TagService.selectedTags = []
    $stateParams.tags = null

  @updateWithTag = (tag) ->
    TagService.updateWithTag(tag)

    QuoteService.filterText = TagService.selectedTags.join(' ')

  @tagSelected = (tag) ->
    tagIndex = _.indexOf(@searchTags, tag)
    tagIndex > -1

  return
