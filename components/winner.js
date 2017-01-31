const React = require('react')
const JSONPretty = React.createFactory(require('react-json-pretty'))

module.exports = ({winner}) => {
  const header = React.createElement('h1', null, winner.name.common)
  return React.createElement('div', {className: 'winner-container'}, header)
}
