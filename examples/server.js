const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const app = express()

app.use('/lib', express.static(path.join(__dirname, './dist')))

// cached pages
const cached = {}
app.get('/', (req, res) => {
  if (!cached[req.path]) {
    cached[req.path] = fs.readFileSync(path.join(__dirname, './index.html'))
  }

  res.write(cached[req.path])
  res.end()
})

const genMapStatVModelScript = () => new Promise((resolve, reject) => {
  const filename = 'index.js'

  webpack({
    entry: path.join(__dirname, '../src/index.js'),
    output: {
      filename
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    },
    mode: 'production'
  }, (err, stats) => {
    console.log(stats.toJson('minimal'))
    const e = err || stats.hasErrors()
    if (e) {
      console.log('Error: ', e)
      reject(e)
    } else {
      const outputFile = path.join(__dirname, `../dist/${filename}`)
      resolve(fs.readFileSync(outputFile))
      fs.unlinkSync(outputFile)
    }
  })
})

app.get('/js/map-state-vmodel.js', async (req, res) => {
  if (!cached[req.path]) {
    cached[req.path] = await genMapStatVModelScript()
  }

  res.setHeader('content-type', 'text/javascript')
  res.write(cached[req.path])
  res.end()
})

const port = '3000'
app.listen(port, () => console.log(`Listen on: ${port}`))
