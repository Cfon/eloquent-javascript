'use strict'

export function parseDate (date) {
  date = new Date(date)
  if (Number.isNaN(date.valueOf())) {
    date = new Date()
  }

  return date
}

export function dateToString (date) {
  date = parseDate(date)
  return date.getFullYear() + '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
    date.getDate().toString().padStart(2, '0')
}

export function datetimeToString (date) {
  date = parseDate(date)
  return dateToString(date) + ' ' +
    date.getHours().toString().padStart(2, '0') + ':' +
    date.getMinutes().toString().padStart(2, '0') + ':' +
    date.getSeconds().toString().padStart(2, '0')
}
