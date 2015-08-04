keys           = require '../../keys'
fibrous        = require 'fibrous'
nodemailer     = require 'nodemailer'
uuid           = require 'node-uuid'
url            = require 'url'
User           = require '../db/models/user'

transporter = nodemailer.createTransport
    service: 'Yahoo'
    auth:
        user: keys.YAHOO_ACCOUNT
        pass: keys.YAHOO_PASSWORD

mailOptions =
  from: 'anastasia.aizman@yahoo.com'
  to: 'anastasia.aizman@gmail.com'
  subject: 'Hello'
  text: 'Hello world'
  html: """<b>
        Hi Sam, this is AnastasiaBot speaking.
        AnastasiaBot wonders,
        what is the meaning of life?</b>"""

exports.sendVerificationEmail = (req, res) ->
  try
    # hash  = req.body.supersecrethash
    email = req.body.email
    user  = User.sync.findOne { email : email }
    mailOptions.to = email
    mailOptions.html = """
      Hi there,
      please click this link to confirm email.
      This is not spam I promise.
      <a href='http://localhost:8000/email-verification/#{email}/#{user.supersecrethash}' class='button'>CONFIRM EMAIL</a>
    """
    transporter.sync.sendMail mailOptions
    res.status(200).send({message:"success!"})
  catch e
    res.status(500).send({error:e})

exports.getVerifiedEmail = (req, res) ->
  parsedUrlArray = req.url.split('/')
  email          = parsedUrlArray[2]
  hash           = parsedUrlArray[3]
  try
    user           = User.sync.findOne { email : email }
    console.log "getVerifiedEmail", user
    if user.supersecrethash == hash
      user.verified = true
      user.sync.save()
      res.status(200).redirect('/')
    else
      throw new Error("Oops! We can't seem to find this email. Please contact admin.")
  catch e
    res.status(500).send({error:e})
