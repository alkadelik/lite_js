<template>
  <div class="home">
    <Header 
      pageTitle="Sales" 
      :addProduct="true"
      @add-button="addButton"
    ></Header>
    <!-- :isActive="is_active" -->
  </div>

  <div id="sales">
    <div v-if="no_sale" class="empty">
      <div class="">
        <img src="../assets/images/no-product-added-image.png" alt="">
        <h2>No registered sales</h2>
        <a class="btn-style" @click="addButton">Add Sale</a>
      </div>
    </div>
    <div v-else id="sales">
      <Orders v-for="order, i in orders" :key="'order' + i" :order="order" :index="i"></Orders>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from "../components/Header";
import Orders from '@/components/Orders'

// Vue.component('star-rating', StarRating)

export default {
name: 'HistoryView',
components: {
  Header,
  Orders,
},
data() {
  return {
    // is_active: false,
    no_sale: true,
  }
},
methods:{
  addButton() {
    this.$router.push({name: 'sales'})
  },
},
computed: {
  ...mapGetters({
    has_sale: 'getHasSale',
    orders: 'getOrders',
  })
},
mounted() {
  if (this.has_sale == true) {
    this.no_sale = false
  }
}
}
</script>

<style scoped>
</style>






