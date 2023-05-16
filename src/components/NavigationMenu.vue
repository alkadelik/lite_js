<template>
    <div class="menu">
      <section id="headerMenu">
        <div class="container">
          <ul class="menu">
            <router-link :to="{name: 'dashboard'}" @click="saveNav(0)">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5153 1.58131C10.826 2.3726 10.5515 7.34855 11.3527 8.14858C12.1539 8.94668 16.9679 8.54277 18.1244 7.63497C20.9067 5.44944 13.7154 -0.945018 11.5153 1.58131Z" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8559 11.7208C16.9112 12.7733 14.1133 18.7735 8.56825 18.7735C4.42696 18.7735 1.07031 15.4258 1.07031 11.2965C1.07031 6.15066 6.16077 2.85925 7.62006 4.31466C8.46019 5.15256 7.51394 9.09545 9.02093 10.5994C10.5279 12.1033 14.8006 10.6683 15.8559 11.7208Z" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Dashboard</p>
              </li>
            </router-link>
            <router-link :to="{name: 'inventory'}" @click="saveNav(1)">
              <li>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.90234 7.36328H11.4139" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.15844 1C2.09147 1 1.06653 1.88295 1.06653 8.98537C1.06653 16.9366 0.917397 19 2.43343 19C3.94851 19 6.42299 15.5099 8.15844 15.5099C9.8939 15.5099 12.3684 19 13.8835 19C15.3995 19 15.2504 16.9366 15.2504 8.98537C15.2504 1.88295 14.2254 1 8.15844 1Z" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Inventory</p>
              </li>
            </router-link>
            <router-link :to="{name: 'history'}" @click="saveNav(2)">
              <li>
                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.7351 5.07819C13.7351 2.82577 11.9045 1.00004 9.64606 1.00004C7.38764 0.98966 5.54947 2.80783 5.53906 5.06025V5.07819" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.4184 9.32812H12.375" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.89889 9.32812H6.85547" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.63758 18.8792C3.47755 18.8792 2.7686 16.9439 1.38572 11.8302C-0.00189875 6.70043 2.78185 4.78125 9.63758 4.78125C16.4933 4.78125 19.2771 6.70043 17.8894 11.8302C16.5066 16.9439 15.7976 18.8792 9.63758 18.8792Z" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Sales</p>
              </li>
            </router-link>
            <router-link :to="{name: 'customers'}" @click="saveNav(3)">
              <li>
                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.97071 14.2543C6.45225 14.2543 4.30078 13.8733 4.30078 12.3477C4.30078 10.8222 6.43825 9.49414 8.97071 9.49414C11.4892 9.49414 13.6406 10.8097 13.6406 12.3345C13.6406 13.8593 11.5032 14.2543 8.97071 14.2543Z" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.97404 7.31981C10.6271 7.31981 11.9676 5.9801 11.9676 4.32704C11.9676 2.67398 10.6271 1.3335 8.97404 1.3335C7.32098 1.3335 5.98048 2.67398 5.98048 4.32704C5.97583 5.97388 7.30543 7.31436 8.95304 7.31981H8.97404Z" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.9377 6.49754C14.8995 6.24018 15.6086 5.36311 15.6086 4.31887C15.6086 3.22953 14.8365 2.3198 13.8086 2.10986" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.3906 8.94922C15.7544 8.94922 16.9192 9.87372 16.9192 10.6995C16.9192 11.1854 16.5172 11.7149 15.9076 11.858" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.00375 6.49754C3.04115 6.24018 2.33203 5.36311 2.33203 4.31887C2.33203 3.22953 3.10491 2.3198 4.13204 2.10986" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.55201 8.94922C2.1882 8.94922 1.02344 9.87372 1.02344 10.6995C1.02344 11.1854 1.42543 11.7149 2.0358 11.858" stroke="#AAB2BD" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Customer</p>
              </li>
            </router-link>
          </ul>
        </div>
      </section>
    </div>
  </template>
  
<script>
import { SAVE_NAVIGATION } from '@/store/mutationTypes'
export default {
	name: 'NavigationMenu',
	props: {
		msg: String
	},
  methods: {
    saveNav(n) {
      this.$store.commit(SAVE_NAVIGATION, n)
    }
  }
}
</script>
  
<style scoped>
.menu {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding:10px;
  background: #FFF;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.04);
  z-index: 1000;
}
ul {
  display: flex;
  justify-content: space-between;
  justify-content: space-around;
  align-items: baseline;
  max-width: 350px;
  margin: 0 auto 0;
  padding: 0;
}
li {
  width: 80px;
  transition: all 0.5s ease;
}
p {
  margin: 0;
}
</style>
  