<template>
    <Header @add-button="addButton"><h3 @click="back" class="close-popup">Add Product</h3></Header>
    <div id="sales" class="nav-margin-top">
      <div>
        <!-- when trying to add sale but the merchant doesn't have any products, it should tell the user -->
        <Products v-if="show_sales_inventory" @open-cart="openCart"></Products>
        <Cart v-if="show_cart" @select-customer="selectCustomer"></Cart>
        <Customers v-if="show_customers" @checkout="checkout" :origin="'sales'"></Customers>
        <Checkout v-if="show_checkout"/>
      </div>
    </div>
</template>

<script>
import { SET_NEXT_BTN_DISPLAY } from '@/store/mutationTypes'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
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
    Cart,
    Checkout,
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
      this.show_cart = true
    },
    selectCustomer() {
      this.show_cart = false
      this.show_customers = true
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
  }
}

  /* 
  DOCUMENTATION
  The add sale process:
  - Select items from SalesInventory component
  - Then add/remove qty in the Cart component
  - Then select (or add) customer from the Customers component (note the Customers component has multiple uses)
  - Then finanlise purchase info at Checkout component - then save sale

  */
</script>

<style scoped>
</style>






