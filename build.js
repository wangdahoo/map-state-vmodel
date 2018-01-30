const {transform} = require('babel-core')
const fs = require('fs')
const path = require('path')
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
fs.writeFileSync(path.join(__dirname, './dist/index.js'), result.code)
