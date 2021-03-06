const React = require('react')
const JSONPretty = React.createFactory(require('react-json-pretty'))

module.exports = ({winner}) => {
  const header = React.createElement('h1', null, winner.name.common)
  const link = React.createElement('a',
    {"href": `https://en.wikipedia.org/wiki/${winner.demonym}_cuisine`}, 
    `Go to wiki article about ${winner.demonym} cuisine`
  )
  return React.createElement('div', {className: 'winner-container'}, header, link)
}
