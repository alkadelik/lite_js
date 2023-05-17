<template>
  <div class="container">
    <Header @add-button="addButton"></Header>

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
          <Customers></Customers>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_NEXT_BTN_DISPLAY } from '@/store/mutationTypes'
import { mapGetters } from "vuex";
import Customers from "../components/CustomerList";
import Header from "../components/Header";

export default {
  name: 'CustomersView',
  components: {
    Customers,
    Header,
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
    this.$store.commit(SET_NEXT_BTN_DISPLAY, false)
  }
}
</script>

<style scoped>

</style>
