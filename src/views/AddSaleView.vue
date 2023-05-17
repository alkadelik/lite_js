<template>
  <div class="home">
    <div id="sales">
      <div>
        <Products v-if="show_sales_inventory" @open-cart="openCart"></Products>
        <Cart v-if="show_cart" @select-customer="selectCustomer"></Cart>
        <Customers v-if="show_customers" @checkout="checkout" :displayNextBtn="hideNextBtnInCustomerList"></Customers>
        <Checkout v-if="show_checkout"></Checkout>


        <div v-if="vegan" id="edit-price-modal" centered title="BootstrapVue"><!-- change price when adding sales if different -->
          <div class="edit-price-body-wrapper">
            <div class="product-body">
              <h2 class="black">Hi,champ</h2>
              <p class="dark">We understand price changes to have an accurate sales record Input the actual
                amount you sold the product.</p>
              <div class="form">
                <div class="form-group">
                  <label for="edit-price">Enter amount sold</label> <br>
                  <input type="text" class="form-control" id="edit-price">
                </div>
                <div class="form-group">
                  <input type="submit" class="btn-style" value="Change Price">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import Customers from '@/components/CustomerList'
import Products from '@/components/ProductShopFloor'

// Vue.component('star-rating', StarRating)

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
    Products,
  },
  data() {
    return {
      // is_active: false,
      vegan: false,
      show_cart: false,
      show_checkout: false,
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
    closeAllModals(){
      this.$bvModal.hide('add-customer-modal')
      this.$bvModal.hide('sale-inventory-modal')
      this.$bvModal.hide('add-sale-modal')
      this.$bvModal.hide('edit-price-modal')
      this.$bvModal.hide('add-customer-modal')
      this.show_sales_inventory = true;
      this.noProduct = true;
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
      // this.is_active = true
    }
  },
  computed: {
    hideNextBtnInCustomerList() {
      return false
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






