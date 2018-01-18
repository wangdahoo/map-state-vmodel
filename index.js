// someName => setSomeName
const setterName = name => 'set' + name[0].toUpperCase() + name.slice(1)

/**
 * mapState for v-model
 * @param {string} namespace 
 * @param {string} name 
 */
const mapStateVModel = (namespace, name) => ({
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

const createSetters = state => {
  const setters = {}
  for (i in state) {
    setters[setterName(i)] = (state, val) => {
      state[i] = val
    }
  }

  return setters
}

export default {
  mapStateVModel,
  createSetters
}
