const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const app = express()

// cached pages
const cached = {}

app.get('/', (req, res) => {
  if (!cached[req.path]) {
    cached[req.path] = fs.readFileSync(path.join(__dirname, './webapp/index.html'))
  }

  res.write(cached[req.path])
  res.end()
})

const genMainScript = () => new Promise((resolve, reject) => {
  const filename = 'main.js'

  webpack({
    entry: path.join(__dirname, './webapp/main.js'),
    output: {
      path: path.join(__dirname, './dist/'),
      filename
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      // short-circuits all Vue.js warning code
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    ],
    resolve: {
      alias: {
        'map-state-vmodel': path.join(__dirname, process.env.NODE_ENV === 'production' ? './dist/index.min.js' : './src/index.js')
      }
    }
  }, (err, stats) => {
    const e = err || stats.hasErrors()
    if (err) return reject(err)

    if (stats.hasErrors()) {
      const errors = stats.toJson('minimal').errors
      for (let e of errors) {
        console.log(e.toString())
      }
      return reject()
    }

    const outputFile = path.join(__dirname, `./dist/${filename}`)
    resolve(fs.readFileSync(outputFile))
    // fs.unlinkSync(outputFile)
  })
})

app.get('/static/main.js', async (req, res) => {
  if (!cached[req.path]) {
    cached[req.path] = await genMainScript()
  }

  res.setHeader('content-type', 'text/javascript')
  res.write(cached[req.path])
  res.end()
})

const port = '3000'
app.listen(port, () => console.log(`Listen on: ${port}`))
