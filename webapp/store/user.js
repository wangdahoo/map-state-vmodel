import {createSetters} from '../../src/index.js'

const state = {
  userName: 'wangdahoo'
}

const mutations = {
  ...createSetters(state)
}

const getters = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
