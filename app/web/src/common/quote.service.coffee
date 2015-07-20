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

    filterQuotesByTags: (tags) ->
      return @quotes if !tags
      filteredQuotes = []
      for quote in @quotes
        quotePushed = false
        for tag in tags
          continue if quotePushed
          if _.indexOf(quote.tagsArray, tag) > -1 && !quotePushed
            filteredQuotes.push quote
            quotePushed = true
      return filteredQuotes


    # createQuote: ->

    #   quoteApi
    #     .post()

  #   #
  #   quotes: [{
  #       _id: 1
  #       tags: ["einstein", "inspiration", "god"]
  #       origin: "www.google.com"
  #       content:
  #         author: "einstein"
  #         body:"Before God we are all equally wise - and equally foolish."
  #
  #     },
  #     {
  #       _id: 2
  #       tags: ["agreement", "chat"]
  #       content:
  #         author: "Eldridge Cleaver"
  #         body:"Too much agreement kills a chat."
  #       },
  #     {
  #       _id: 3
  #       tags: ["agreement", "chat"]
  #       content:
  #         author: "Eldridge Cleaver"
  #         body:"My fake plants died because I did not pretend to water them."
  #     },
  #     {
  #       _id: 4
  #       tags: ["language", "english"]
  #       content:
  #         author: "Robert Benchley"
  #         body:"Drawing on my fine command of the English language, I said nothing."
  #       }
  #     {
  #       _id: 4
  #       tags: ["fonts", "long", "example"]
  #       content:
  #         author: "random website"
  #         body:"Underground Pro expands on the historical design by Edward Johnston, licensed exclusively to P22 from the London Transport Museum. The overall design of Underground Pro is kept as intended by Johnston and remains within his system of proportions. Additional OpenType features, such as Small Caps and Petite Caps, are included in all 6 weights. A Titling option that mimics London Transport signage is offered in the medium weight. "
  #       }
  #     ]
  return obj
