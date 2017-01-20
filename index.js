const args = require('args')
const fs = require('fs')

const countries = require('./countries')
args.option('init', 'make roulette wheel')
const flags = args.parse(process.argv)

if (flags.init) {
  fs.writeFile('wheel.json', JSON.stringify(countries))
  fs.writeFile('winners.json', '[]')
} else {
  let wheel = require('./wheel')
  let winners = require('./winners')

  if (wheel.length === 0) return

  // :O :O :O
  const winner = wheel.splice(Math.floor(Math.random()*wheel.length), 1)[0]
  winners.push(winner)

  // output
  console.log(`${wheel.length}/${countries.length}`)
  console.log(winner)

  // save
  fs.writeFile('wheel.json', JSON.stringify(wheel))
  fs.writeFile('winners.json', JSON.stringify(winners))
}