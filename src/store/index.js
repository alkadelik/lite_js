import { createStore } from 'vuex'
import mutations from './mutations'
import getters from './getters'
import state from './state'

export default createStore({
  state,
  mutations,
  getters,
  actions: {},
  modules: {},
})