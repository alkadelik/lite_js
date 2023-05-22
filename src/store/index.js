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
});

// import VuexPersistence from "vuex-persist";
// Vue.use(Vuex);

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   key: "leyyow",
//   // reducer: state => ({
//   //   store: state.store,
//   //   settlement: state.settlement,
//   //   inventory: state.inventory,
//   //   orders: state.orders,
//   // })
// });

//--------------------------------------------------


// index from a previous project looked like this:
// import Vue from 'vue'
// import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

// Vue.use(Vuex)

// import state from './state'
// import mutations from './mutations'
// import actions from './actions'

// export default new Vuex.Store({
//   state,
//   mutations,
//   actions,
//   plugins: [createPersistedState({
//     key: 'iamcart_merchant'
//   })],

//   modules: {
//   }
// })
