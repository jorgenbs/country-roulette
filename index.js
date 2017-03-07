const express = require('express')
const args = require('args')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const JSONPretty = React.createFactory(require('react-json-pretty'))

const roulette = require('./roulette')
const List = require('./components/list')

// recurring draw at 11:00AM at the start of the week
const CronJob = require('cron').CronJob
const job = new CronJob({
  cronTime: '00 00 12 * * 1',
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
  
  let html = ReactDOMServer.renderToString(List({winners}))
  const css = `html,body{margin:0.4em 0 0;padding:0}
    .json-pretty{margin: 0;line-height:1.3;color:rgba(245,187,18,1);background:#1e1e1e}.json-pretty .json-key{color:rgba(211,66,46,1)}
    .json-pretty .json-value{color:rgba(191,215,219,1)}.json-pretty .json-string{color:rgba(127,214,250,1)}
    .json-pretty .json-boolean{color:rgba(75,174,22,1)}
    .prev-winner {text-align: center;text-shadow: 0 0 5px rgba(0,0,0,0.5);color: transparent;}
    .prev-winner:hover {text-shadow: none;color: black;}
    .winner-container { position: relative; }
    h1 {text-align: center;color: #333333;position: initial;font-size: 4em;}
    h1:before {content: "this week's winner:";font-size: 0.2em;position: absolute;top: -4px;color: #828282;font-weight: 300;}
    `
  res.write(`
    <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      new draw at Monday 12:00 CET
    </body>
    </html>
  `)

  res.end()
})

server.listen(port, (error) => {
  if (error) throw error
  console.log(`Server is listening at ${port}`)
})