const LIB_NAME = 'MapStateVModel'
const fs = require('fs')
const browserify = require('browserify')
const babelify = require('babelify')
const uglify = require('uglify-js')
const moment = require('moment')
const pkg = require('./package.json')

// banner
const makeBanner = () => {
  return [
    '/*!',
    `${LIB_NAME} v${pkg.version}`,
    `${pkg.author}`,
    `${moment().format('YYYY-MM-DD HH:mm:ss')}\n */\n`,
  ].join('\n * ')
}

// uglify
const writeStream = fs.createWriteStream('./dist/index.js')
writeStream.on('finish', () => fs.writeFileSync('./dist/index.min.js', makeBanner() + uglify.minify(fs.readFileSync('./dist/index.js').toString()).code))

// transform code
browserify({ debug: true, standalone: LIB_NAME })
  .transform(babelify, {
    sourceType: 'module',
    presets: [
      ["env", {
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }]
    ]
  })
  .require('./src/index.js', { entry: true })
  .bundle()
  .on('error', err => console.log('Error: ' + err.message))
  .pipe(writeStream)
