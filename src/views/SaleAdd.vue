<template>
    <Header back_to='sales' @add-button="addButton"></Header>
    <div id="sales" class="nav-margin-top">
      <div>
        <Products v-if="show_sales_inventory" @open-cart="openCart"></Products>
        <Customers v-if="show_customers" @checkout="checkout" :origin="'sales'"></Customers>
      </div>
    </div>
</template>

<script>
import { SET_NEXT_BTN_DISPLAY } from '@/store/mutationTypes'
import { SET_HEADER_SETTINGS } from '@/store/mutationTypes'
import Customers from '@/components/CustomerList'
import Products from '@/components/ProductShopFloor'
import Header from "../components/Header"

// select items (no variants)
// increase / decrease / delete item in cart
// attach customer details to cart
// create order
// create order items
export default {
  name: 'SalesView',
  components: {
    Customers,
    Header,
    Products,
  },
  data() {
    return {
      show_cart: false,
      show_checkout: false,
      show_checkouttoo: false,
      show_customers: false,
      show_sales_inventory: true,
    }
  },
  methods:{
    addButton() {
      this.showInventory()
    },
    checkout() {
      this.show_customers = false
      this.show_checkout = true
    },
    openCart() {
      this.show_sales_inventory = false
      this.$router.push({name: 'cart'})
    },
    selectCustomer() {
    },
    showInventory() {
      this.show_sales_inventory = true
    },
  },
  mounted() {
    this.$store.commit(SET_NEXT_BTN_DISPLAY, true)

    if (this.$route.params.origin == 'new_customer') {
      this.show_sales_inventory = false
      this.show_checkout = true
    }
    if (this.$route.params.origin == 'cart') {
      this.show_sales_inventory = false
      this.show_customers = true
    }
  },
  beforeMount() {
    this.$store.commit(SET_HEADER_SETTINGS, 20)
  }
}

  /* 
  DOCUMENTATION
  The add sale process:
  - Select items from SalesInventory component (ideally with variants)
  - Then add/remove qty in the Cart component
  - Then select (or add) customer from the Customers component (note the Customers component has multiple uses)
  - Then finanlise purchase info at Checkout component - then save sale

  */
</script>

<style scoped>
</style>






