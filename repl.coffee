#!/usr/bin/env coffee

CoffeeScript = require 'coffee-script'
vm           = require 'vm'
repl         = require 'repl'
fibrous      = require 'fibrous'
mongoose     = require 'mongoose'

module.exports =
  start: ->
    console.log "Starting fibrous REPL..."
    r = repl.start({
      eval: fibrous (code, context, file) ->
        code = CoffeeScript.compile(code, {filename: file, bare: true})
        return vm.runInContext(code, context, file)
    })
    r.on 'exit', ->
      mongoose.disconnect()
