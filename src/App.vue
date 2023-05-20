<template>
  <router-view/>
  <div class="menu-padding"></div>
  <Menu v-if="logged_in"></Menu>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store/index'
import * as mutationTypes from '@/store/mutationTypes'

import Menu from '@/components/NavigationMenu.vue';
export default {
  components: {
    Menu,
  },
  computed: {
    ...mapGetters({
      logged_in: 'getLoggedIn',
    })
  },
  created() {
    let token = window.sessionStorage.getItem("leyyow_token");
    if (token) {
      // this.$store.commit(mutationTypes.LOGGED_IN, true);
      store.commit(mutationTypes.LOGGED_IN, true);
    } else {
      this.$store.commit(mutationTypes.LOGGED_IN, false);
    }
  }
}
</script>

<style>
.menu-padding {
  height: 125px;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
body {
  padding: 10px;
}
ul {
  list-style-type: none;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.btn-style {
  display: inline-block;
  position: relative;
  transition: all 1s ease;
  border: 2px solid #4CAF50;
  color: #ffffff;
  border-radius: 6px;
  font-weight: 600 !important;
  font-size: 20px !important;
  line-height: 15px !important;
  /* height: 45px; */
  /* padding: 14px 30px 15px;
  text-align: center; */
  /* text-transform: capitalize; */
  background: #4CAF50;
  vertical-align: middle;
  min-width: 161px;
  text-decoration: none;
  padding: 15px;
}

.float-btn-style {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  min-width: calc(100% - 45px);
  padding: 15px;
  /* min-width: calc(100% - 40px); */
}
.empty {
  height: 100vh;
  height: calc(100vh - 100px);
  /* height: 100svh; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-margin-top {
  padding-top: 75px;
}
</style>
