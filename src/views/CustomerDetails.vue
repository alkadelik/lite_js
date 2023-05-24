<template>
  <div class="container">
    <Header back_to='customer list' @add-button="addButton" @back="back"></Header>
    <div class="product-body nav-margin-top">
      <div class="img-wrapper">
        <!-- <img src="../assets/images/detail-products-image-1.png" alt=""> -->
        <!-- <img :src="'http://127.0.0.1:8000' + product.product_image" alt=""> -->
      </div>
      <div class="product-detail-wrapper">
        <hr>
        <div class="product-detail">
          <div class="row">
            <div class="col-3">
              <span>Name</span>
            </div>
            <div class="col-9">
              <h3>{{ customer.first_name }} {{ customer.last_name }}</h3>
            </div>
          </div>
        </div>
        <hr>
        <div class="product-detail">
          <div class="row">
            <div class="col-6">
              <span>Price</span>
            </div>
            <div class="col-6">
              <h3>&#8358;{{ customer.line1 }}</h3>
            </div>
          </div>
        </div>
        <hr>
        <div class="product-detail">
          <div class="description">
            <span>Description</span>
            <p>{{ customer.phone }}</p>
          </div>
        </div>
        <hr>
      </div>
      <div class="product-btn">
        <button @click="editCustomer">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header"
import { mapGetters } from "vuex"
import { SET_HEADER_SETTINGS } from "@/store/mutationTypes"

export default {
  name: 'CustomerDetails',
  components: {
    Header,
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    editCustomer() {
      this.$router.push({name: 'add_customer', params:{origin: '_'}}) // edit customer on same page
    },
  },
	computed: {
		...mapGetters({
      customer: 'getCustomerToEdit'
		}),
	},
  beforeMount() {
    this.$store.commit(SET_HEADER_SETTINGS, 30)
  }
}
</script>

<style scoped>
.img-wrapper {
  width: 100%;
  height: 186px;
  border-radius: 8px;
  overflow: hidden;
}
.img-wrapper img {
  max-width: 100%;
}
.row {
  display: flex;
  /* border-top: 0.5px solid blue; */
  /* border-bottom: 0.5px solid blue; */
}
.row div:first-of-type, .description {
  text-align: left;
}
.row h3 {
  margin: 0;
}
hr {
  height: 0.5px;
  color: #999999;
}
.row div:last-of-type {
  text-align: right;
  /* border-bottom: 0.5px solid blue; */
}
.description p {
  margin-top: 10px;
}
button {
  position: absolute;
  right: 0;
  margin-right: 20px;
  transition: all 1s ease;
  border: 2px solid #4CAF50;
  color: #4CAF50;
  border-radius: 8px;
  font-weight: 600 !important;
  height: 45px;
  background: #FFF;
  width: 120px;
}
</style>
