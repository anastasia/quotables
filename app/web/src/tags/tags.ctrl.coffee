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
    selected = @tagSelected(tag)

    if selected then TagService.selectedTags.splice(tagIndex,1) else TagService.selectedTags.push tag
    $state.current.reloadOnSearch = false
    $state.transitionTo "home", { notify: false, location: "replace", reload:false, inherit:false, 'tags': TagService.selectedTags.join(',') }
    $state.current.reloadOnSearch = undefined

    QuoteService.filterText =  TagService.selectedTags.join(' ')

  @tagSelected = (tag) ->
    tagIndex = _.indexOf(@searchTags, tag)
    tagIndex > -1

  return
