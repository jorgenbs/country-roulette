const express = require('express')
const args = require('args')

const roulette = require('./roulette')
const server = express()

server.get('*', (req, res) => {
  const winner = roulette()
  
  if (winner === null) {
    res.write('Ran out of countries')
  } else {
    res.write(JSON.stringify(winner))
  }
  res.end()
})

server.listen('8080', (error) => {
  if (error) throw error
  console.log('Server is running at localhost:5000')
})