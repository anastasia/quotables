angular.module("app")
.service "QuoteService", (Restangular) ->
  quoteApi = Restangular.all('quotes')

  obj =
    filterText: ""
    quotes: []
    selectedQuote: {}
    createQuote: (obj) ->
      quoteApi
        .customPOST(obj, 'new')
        .then =>
          @getQuotes()
        .then ->
          return "success!"
        .catch (e) ->
          console.log "getting back error:", e

    updateQuote: (updates) ->
      quoteApi
        .one(updates.id)
        .patch(updates)

    getQuotes: ->
      quoteApi
        .getList()
        .then (quotes) =>

          for quote in quotes
            quote.tagsArray = _.pluck(quote.tags, "value")
            @quotes.push quote
          return

    populateTags: ->
      tags = []
      tags = tags.concat quote.tags for quote in @quotes
      uniqueTags = {}
      uniqueTags[tag.value] = true for tag in tags
      @tags = Object.keys uniqueTags
      return

    filterByTags: (tags) ->
      return @quotes if !tags
      @filterText    = tags.join(', ')
      filteredQuotes = []
      for quote in @quotes
        quotePushed = false
        for tag in tags
          continue if quotePushed
          if _.indexOf(quote.tagsArray, tag) > -1 && !quotePushed
            filteredQuotes.push quote
            quotePushed = true
      filteredQuotes


  return obj
