<template>
  <div class="customer">
    <Header @add-button="addButton"></Header>

    <div id="orders">
      <div class="container text-center">
        <div class="empty" v-if="no_customer">
          <div class="">
            <img src="../assets/images/no-product-added-image.png" alt="">
            <h2>No customers added</h2>
            <p>Add customers so you can keep track <br>
              of their purchases from your store.</p>
            <a class="btn-style" @click="addCustomer">Add Customer</a>
          </div>
        </div>
        <div v-else>
          <Customers v-if="show_customer_list"></Customers>
          <AddCustomer v-if="show_customer_form"></AddCustomer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddCustomer from "../components/CustomerAdd";
import Customers from "../components/CustomerList";
import Header from "../components/Header";

export default {
  name: 'CustomersView',
  components: {
    AddCustomer,
    Customers,
    Header,
  },
  data() {
    return {
      showProductInventory: false,
      no_customer: true,
      show_customer_form: false,
      show_customer_list: true,
    }
  },
  methods:{
    addButton() {
      this.addCustomer()
    },
    addCustomer() {
      this.no_customer = false
      this.show_customer_form = true
      this.show_customer_list = false
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
    })
  },
  mounted() {
    if (this.has_customer == true) {
      this.no_customer = false
    }
  }
}
</script>

<style scoped>

</style>
