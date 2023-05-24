<template>
  <div class="container">
    <Header @add-button="addButton"></Header>
    <div v-if="no_sale" class="empty">
      <div class="">
        <img src="../assets/images/no-product-added-image.png" alt="">
        <h2>No registered sales</h2>
        <a class="btn-style" @click="addButton">Add Sale</a>
      </div>
    </div>
    <div v-else class="nav-margin-top">
      <Orders v-for="order, i in orders" :key="'order' + i" :order="order" :index="i"></Orders>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_HEADER_SETTINGS } from '@/store/mutationTypes'
import Header from "../components/Header";
import Orders from '@/components/Orders'

export default {
name: 'HistoryView',
components: {
  Header,
  Orders,
},
data() {
  return {
    no_sale: true,
  }
},
methods:{
  addButton() {
    this.$router.push({name: 'add_sale', params: {origin: '_'}})
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
},
beforeMount() {
  this.$store.commit(SET_HEADER_SETTINGS, 2)
}
}
</script>

<style scoped>
</style>






