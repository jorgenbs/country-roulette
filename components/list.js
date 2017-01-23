const React = require('react')

const Winner = require('./winner')
const PreviousWinner = require('./previousWinner')

module.exports = ({winners}) => {
  
  return React.createElement('div', 
    null, 
    winners.map((winner, i) => {
      return i == winners.length - 1 ? Winner({winner}) : PreviousWinner({winner})
    }))
}
