angular.module("app")
.service "TagService", ($state) ->
  obj =
    selectedTags: []
    updateWithTag: (tag) ->
      tagIndex = _.indexOf @selectedTags, tag
      selected = tagIndex > -1
      if selected then @selectedTags.splice(tagIndex,1) else @selectedTags.push tag
      $state.current.reloadOnSearch = false
      $state.transitionTo "home", { notify: false, location: "replace", reload:false, inherit:false, 'tags': @selectedTags.join(',') }
      $state.current.reloadOnSearch = undefined

  return obj
