const React = require('react')
const JSONPretty = React.createFactory(require('react-json-pretty'))

module.exports = ({winner}) => {
  return React.createElement('div', {className: 'prev-winner'}, `${winner.name.common}`)
}
