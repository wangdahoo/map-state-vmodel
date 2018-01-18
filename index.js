/**
 * mapState for v-model
 * @param {string} namespace 
 * @param {string} name 
 * @param {string} mutation 
 */
const mapStateVModel = (namespace, name, mutation) => ({
  [name]: {
    get () {
      return namespace.split('/').reduce((result, name) => {
        return result && result[name]
      }, this.$store.state)[name]
    },

    set (val) {
      this.$store.commit(`${namespace}/${mutation}`, val)
    }
  }
})

export default mapStateVModel
