import {createSetters} from 'map-state-vmodel'

const state = {
  userName: 'wangdahoo',

  form: {
    mobile: '13585711611',
    password: '123456'
  }
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
