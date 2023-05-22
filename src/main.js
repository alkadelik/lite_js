import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import mitt from 'mitt'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

let token = window.localStorage.getItem("leyyow_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

store.subscribe((mutation, state) => {
  // localStorage.setItem('leyyow_' + state.store_slug, JSON.stringify(state))
  localStorage.setItem('leyyow', JSON.stringify(state))
})

// const emitter = mitt()
// const app = createApp(App)
// app.config.globalProperties.emitter = emitter

// app.use(store).use(router).mount('#app')
createApp(App).use(store).use(router).mount('#app')
