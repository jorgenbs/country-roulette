const express = require('express')
const args = require('args')

const roulette = require('./roulette')
const server = express()
const port = process.env.PORT || 8080

server.get('*', (req, res) => {
  const winner = roulette()
  
  if (winner === null) {
    res.write('Ran out of countries')
  } else {
    res.write(JSON.stringify(winner))
  }
  res.end()
})

server.listen(port, (error) => {
  if (error) throw error
  console.log(`Server is listening at ${port}`)
})