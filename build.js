const CODE_NAME = 'MapStateVModel'
const {transform} = require('babel-core')
const fs = require('fs')
const path = require('path')
const uglify = require('uglify-js')
const umd = require('umd')

const code = fs.readFileSync(path.join(__dirname, './index.js'))
const result = transform(code, {
  sourceType: 'script',
  presets: [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
})

fs.writeFileSync(path.join(__dirname, './dist/index.min.js'), uglify.minify(umd(CODE_NAME, result.code + `\n\nreturn ${CODE_NAME}`)).code)
