angular.module('app')
.controller "TagsCtrl", ($stateParams, $state, $scope, QuoteService) ->
  @allTags    = QuoteService.tags
  @searchTags = if $stateParams.tags then $stateParams.tags.split ',' else []
  tagIndex    = null

  @clearTags = ->
    @searchTags = []
    $stateParams.tags = null

  @updateWithTag = (tag) ->
    selected = @tagSelected(tag)

    if selected then @searchTags.splice(tagIndex,1) else @searchTags.push tag

    $state.current.reloadOnSearch = false
    $state.transitionTo "home", { notify: false, location: "replace", reload:false, inherit:false, 'tags': @searchTags.join(',') }
    $state.current.reloadOnSearch = undefined


  @tagSelected = (tag) ->
    tagIndex = _.indexOf(@searchTags, tag)
    tagIndex > -1

  return
