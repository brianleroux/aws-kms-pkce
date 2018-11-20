let crypto = require('crypto')
let aws = require('aws-sdk')

// base64-url encodes given string
let encode = str=> str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

// returns a base64-url encoded sha for given string
let hash = str=> encode(crypto.createHash('sha256').update(str).digest('base64'))


/**
 * //usage 
 *
 *  let pkce = require('kms-pkce')
 *  pkce(console.log)
 *
 * //async usage
 *
 *  let pkce = require('kms-pkce')
 *  async function main() {
 *    let tokens = await pkce()
 *    console.log(tokens)
 *  }
 *  main()
 *
 */
module.exports = function pkce(callback) {

  let min = 32 // encodes to a string length of 43
  let max = 96 // encodes to a string length of 128

  // return a promise if no callback is supplied
  let promise
  if (!callback) {
    promise = new Promise(function wtf(res, rej) {
      callback = function errback(err, result) {
        err ? rej(err) : res(result)
      }
    })
  }

  // YAS, this method is so fun
  let kms = new aws.KMS
  kms.generateRandom({NumberOfBytes: max}, function done(err, result) {
    if (err) throw err
    let verification = encode(result.Plaintext.toString('base64'))
    let challenge = hash(verification)
    callback(null, {verification, challenge})
  })

  return promise
}
