angular.module("app")
.service "QuoteService", (Restangular) ->
  quoteApi = Restangular.all('quotes')

  obj =
    quotes: []
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
      filteredQuotes = []
      for quote in @quotes
        quotePushed = false
        for tag in tags
          continue if quotePushed
          if _.indexOf(quote.tagsArray, tag) > -1 && !quotePushed
            filteredQuotes.push quote
            quotePushed = true
      filteredQuotes

    filterText: ""

  return obj



# console.log "filterByText", text
# # for quote in @quotes
# filteredQuotes = []
#
# return @quotes if !text
# for quote in @quotes
#   if quote.content.author.indexOf(text) > -1 || quote.content.title.indexOf(text) > -1 || quote.content.body.indexOf(text) > -1
#     filteredQuotes.push quote
#
# filteredQuotes
