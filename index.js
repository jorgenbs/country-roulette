const express = require('express')
const CronJob = require('cron').CronJob
const args = require('args')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const JSONPretty = React.createFactory(require('react-json-pretty'))

const roulette = require('./roulette')
const List = require('./components/list')

const job = new CronJob({
  cronTime: '* * * * * *',
  onTick: () => {
    roulette.draw()
  },
  start: true,
  timeZone: 'Europe/Paris'
})


const server = express()
const port = process.env.PORT || 8080

server.get('/', (req, res) => {
  const winners = require('./winners')

  // const {winner, winners} = roulette.draw()
  
  const html = ReactDOMServer.renderToString(List({winners}))
  const css = `html,body{margin:0;padding:0}.json-pretty{line-height:1.3;color:rgba(245,187,18,1);background:#1e1e1e}.json-pretty .json-key{color:rgba(211,66,46,1)}.json-pretty .json-value{color:rgba(191,215,219,1)}.json-pretty .json-string{color:rgba(127,214,250,1)}.json-pretty .json-boolean{color:rgba(75,174,22,1)}`
  res.write(`
    <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `)

  res.end()
})

server.listen(port, (error) => {
  if (error) throw error
  console.log(`Server is listening at ${port}`)
})