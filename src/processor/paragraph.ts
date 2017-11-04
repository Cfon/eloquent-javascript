'use strict'

export type ParagraphMeta = { [key: string]: undefined | true | object }

export default class Paragraph {
  /** The original text of the paragraph */
  source: string

  /** The translation of the paragraph */
  translation: string

  /** The additional data of the paragraph */
  meta: ParagraphMeta = {}

  constructor (input: string) {
    // parse translation and meta by line
    const result: { [key: string]: string[] } = {
      source: [],
      translation: []
    }

    let state = 'source'
    input.split('\n').forEach(content => {
      if (content[0] === '@') {
        if (content[1] === '!') {
          const directive = content.slice(2)
          let argsStart
          if ((argsStart = directive.indexOf(' ')) !== -1) {
            // arguments of a meta is in JSON format
            const args = JSON.parse(directive.slice(argsStart + 1))
            this.meta[directive.slice(0, argsStart)] = args
          } else {
            this.meta[directive] = true
          }

          // move to the next line
          return
        } else if (state === 'source') {
          state = 'translation'
        }

        // remove '@'
        content = content.slice(1)
      } else if (state === 'translation') {
        throw new SyntaxError('Mixed source and translation:\n' + input)
      }

      result[state].push(content)
    })

    this.source = result['source'].join('\n')
    this.translation = result['translation'].join('\n')
  }

  /** Generate the source string from the paragraph object */
  toString () {
    const source = this.source
    const translation = this.translation
      .split('\n')
      .filter(l => l)
      .map(l => `@${l}`)
      .join('\n')

    const meta = Object.entries(this.meta)
      .map(([k, v]) => `@!${k} ${v === true ? '' : JSON.stringify(v)}`.trim())
      .join('\n')

    return [source, translation, meta].filter(s => s).join('\n').trim()
  }

  /**
   * Get the final translation of the paragraph.
   * If this paragraph has no translation (maybe intended),
   * use its source instead.
   */
  getTranslation () {
    return this.translation || this.source
  }
}
