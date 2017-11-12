/* eslint-disable */

function childrenText (children) {
  let text = ''
  for (let i = 0; i < children.length; i++) { if (children[i].type == 'text') text += children[i].content }
  return text
}

function hash (text) {
  let sum = require('crypto').createHash('sha1')
  sum.update(text)
  return sum.digest('base64').slice(0, 10)
}

function startAndEnd (text) {
  var words = text.split(/\W+/)
  if (!words[0]) words.shift()
  if (!words[words.length - 1]) words.pop()
  if (words.length <= 6) return words.join(' ')
  return words.slice(0, 3).join(' ') + ' ' + words.slice(words.length - 3).join(' ')
}

function tokenText (token) {
  if (token.type == 'text') return token.content
  else if (token.type == 'softbreak') return ' '
}

function smartQuotes (tokens, i) {
  let text = tokens[i].content, from = 0
  for (let j = i - 1, tt; j >= 0; j--) {
    if (tt = tokenText(tokens[j])) {
      text = tt + text
      from = tt.length
      break
    }
  }
  let to = text.length
  for (let j = i + 1, tt; j < tokens.length; j++) {
    if (tt = tokenText(tokens[j])) {
      text += tt
      break
    }
  }

  return text
    .replace(/([\w\.,!?\)])'/g, '$1’')
    .replace(/'(\w)/g, '‘$1')
    .replace(/([\w\.,!?\)])"/g, '$1”')
    .replace(/"(\w)/g, '“$1')
    .slice(from, to)
}

function handleIf (tokens, i, options) {
  let tag = tokens[i].args[0]
  if (options.defined.indexOf(tag) > -1) return i
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j].type == 'meta_if_close' && tokens[j].args[0] == tag) { return j }
  }
}

function transformInline (tokens, options) {
  let result = []
  for (let i = 0; i < tokens.length; i++) {
    let tok = tokens[i], type = tok.type
    if (type == 'meta_if_close' || (options.index === false && type == 'meta_index')) {
      // Drop
    } else if (type == 'meta_if_open') {
      i = handleIf(tokens, i, options)
    } else {
      if (type == 'text' && /[\'\"]/.test(tok.content)) tok.content = smartQuotes(tokens, i)
      result.push(tok)
    }
  }
  return result
}

exports.transformTokens = function (tokens, options) {
  let meta = {}, result = []
  for (let i = 0; i < tokens.length; i++) {
    let tok = tokens[i], type = tok.type
    if (type == 'meta_meta') {
      for (let prop in tok.args[0]) meta[prop] = tok.args[0][prop]
    } else if (type == 'meta_id') {
      for (let j = i + 1; j < tokens.length; j++) {
        if (tokens[j].tag) {
          ;(tokens[j].attrs || (tokens[j].attrs = [])).push(['id', tok.args[0]])
          break
        }
      }
    } else if (type == 'meta_if_open') {
      i = handleIf(tokens, i, options)
    } else if (type == 'meta_if_close' || (options.index === false && (type == 'meta_indexsee' || type == 'meta_index'))) {
      // Drop
    } else if (tok.tag == 'h1') {
      if (tokens[i + 1].children.length != 1) throw new Error('Complex H1 not supported')
      meta.title = tokens[i + 1].children[0].content
      i += 2
    } else {
      if (type == 'paragraph_open') { tok.hashID = 'p_' + hash(startAndEnd(childrenText(tokens[i + 1]))) } else if (type == 'heading_open') { tok.hashID = 'h_' + hash(childrenText(tokens[i + 1])) } else if (type == 'fence') { tok.hashID = 'c_' + hash(tok.content) }

      if (tok.children) tok.children = transformInline(tok.children, options)

      result.push(tok)
    }
  }
  return {tokens: result, metadata: meta}
}
