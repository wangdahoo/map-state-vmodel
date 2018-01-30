const assign = require('object-assign')

// someName => setSomeName
const setterName = name => 'set' + name[0].toUpperCase() + name.slice(1)

const mapState = (namespace, name) => ({
  [name]: {
    get () {
      return namespace.split('/').reduce((result, name) => {
        return result && result[name]
      }, this.$store.state)[name]
    },

    set (val) {
      this.$store.commit(`${namespace}/${setterName(name)}`, val)
    }
  }
})

/**
 * mapState for v-model
 * @param {string} namespace 
 * @param {string} name 
 */
const mapStateVModel = (namespace, names) => {
  return (Array.isArray(names) ? names : [names])
    .map(name => mapState(namespace, name))
    .reduce((target, attr) => assign(target, attr), {})
}

const createSetters = state => {
  const setters = {}
  for (let i in state) {
    setters[setterName(i)] = (state, val) => {
      state[i] = val
    }
  }

  return setters
}

const MapStateVModel = {
  mapStateVModel,
  createSetters
}
