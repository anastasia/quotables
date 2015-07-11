angular.module("app")
.controller "ListCtrl", ->
  @quotes = [{
      _id: 1
      tags: ["einstein", "inspiration", "god"]
      origin: "www.google.com"
      content:
        author: "einstein"
        body:"Before God we are all equally wise - and equally foolish."
        title: ""

    },
    {
      _id: 2
      tags: ["agreement", "chat"]
      content:
        author: "Eldridge Cleaver"
        body:"Too much agreement kills a chat."
        title: ""
      },
      {
        _id: 3
        tags: ["agreement", "chat"]
        content:
          author: "Eldridge Cleaver"
          body:"My fake plants died because I did not pretend to water them."
          title: ""
      },
      {
        _id: 4
        tags: ["language", "englist"]
        content:
          author: "Robert Benchley"
          body:"Drawing on my fine command of the English language, I said nothing."
          title: ""
        }
    ]
