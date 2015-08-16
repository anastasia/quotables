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

    getClass : (tag) ->
      # hacky way to consistently get the same color
      num = tag.length
      return "five" if num % 6 == 0
      return "one" if num % 7 == 0
      return "three" if num % 3 == 0
      return "four" if num % 5 == 0
      return "two" if num % 2 == 0
      return "five"






  return obj
