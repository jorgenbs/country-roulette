const React = require('react')

const Winner = require('./winner')

module.exports = ({winners}) => {
  // history on top:
  // winners.reverse()

  return React.createElement('div', 
    null, 
    winners.map((winner, i) => {
      return i == winners.length - 1 ? Winner({winner}) : `${winner.name.common}, `
    }))
}
