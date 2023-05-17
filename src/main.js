import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import mitt from 'mitt'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

let token = window.sessionStorage.getItem("leyyow_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

// const emitter = mitt()
// const app = createApp(App)
// app.config.globalProperties.emitter = emitter


// from fiver contract
    // import '@babel/polyfill'
    // import 'mutationobserver-shim'
    // import Vue from 'vue'
    // import './plugins/bootstrap-vue'


    // import './assets/scss/main.scss'
    // import 'bootstrap/dist/css/bootstrap.css'
    // import 'bootstrap-vue/dist/bootstrap-vue.css'
    // // import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'



    // // Vue.use(BootstrapVue)
    // // Vue.use(IconsPlugin)
    // // Vue.use(sassStyles)

    // Vue.config.productionTip = false
// end fiver contract

// app.use(store).use(router).mount('#app')
createApp(App).use(store).use(router).mount('#app')
