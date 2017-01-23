const args = require('args')
const fs = require('fs')

const countries = require('./countries')

args.option('init', 'make roulette wheel')
const flags = args.parse(process.argv)

if (flags.init) {
  fs.writeFile('wheel.json', JSON.stringify(countries))
  fs.writeFile('winners.json', '[]')
  console.log('fresh restart')
}

const draw = () => {
  let wheel = require('./wheel')
  let winners = require('./winners')

  if (wheel.length == 0) {
    console.log(`All done. Run with --init flag to restart.`)
    return null
  }

  // :O :O :O
  const winner = wheel.splice(Math.floor(Math.random()*wheel.length), 1)[0]
  winners.push(winner)

  // output
  console.log(`Winner: ${winner.name.common}`)
  console.log(`Winners: ${winners.length}`)
  console.log(`Countries remaining: ${wheel.length}/${countries.length}`)

  // save
  fs.writeFile('wheel.json', JSON.stringify(wheel))
  fs.writeFile('winners.json', JSON.stringify(winners))

  return {winner, winners}
}

module.exports = {
  draw,
}