const React = require('react')
const JSONPretty = React.createFactory(require('react-json-pretty'))

module.exports = ({winner}) => {
  return React.createElement('div', null, JSONPretty({json: winner}))
}
