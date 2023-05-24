<template>
  <div class="container">
    <div id="orders">
      <div class="text-center">
        <div class="empty" v-if="no_customer">
          <div class="">
            <img src="../assets/images/no-product-added-image.png" alt="">
            <h2>No customers added</h2>
            <p>Add customers so you can keep track <br>
              of their purchases from your store.</p>
            <a class="btn-style" @click="addCustomer">Add Customer</a>
          </div>
        </div>
        <div class="nav-margin-top">
          <Customers :origin="'customer'"></Customers>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as mutationTypes from '@/store/mutationTypes'
import { mapGetters } from "vuex";
import Customers from "../components/CustomerList";

export default {
  name: 'CustomersView',
  components: {
    Customers,
  },
  data() {
    return {
      showProductInventory: false,
      no_customer: true,
    }
  },
  methods:{
    addButton() {
      this.addCustomer()
    },
    addCustomer() {
      this.$router.push({name: 'add_customer'})
    },
    manageOrders(){
      this.showProductInventory = false;
      this.manageOrder = true;
      this.$bvModal.hide('select-customer-modal')
    }
  },
  computed: {
    ...mapGetters({
      has_customer: 'getHasCustomer',
    }),
  },
  mounted() {
    if (this.has_customer == true) {
      this.no_customer = false
    }
    this.$store.commit(mutationTypes.SET_NEXT_BTN_DISPLAY, false)
    this.$store.commit(mutationTypes.SET_CUSTOMER_TO_EDIT, {})
  }
}
</script>

<style scoped>

</style>
