<template>
  <div class="container">
    <Header @add-button="addButton"></Header>
    <section v-if="no_product" id="inventory">
      <div class="text-center">
        <div class="empty"  :class="{'active' : noProduct}">
          <div class="content-wrapper">
            <img src="../assets/images/no-product-added-image.png" alt="">
            <h2>No products added</h2>
            <p class="dark">Add products to your store so you can <br>
              take orders easily.</p>
            <a class="btn-style" @click="addProduct">Add Product</a>
          </div>
        </div>
      </div>
    </section>
    <div v-else class="nav-margin-top">
      <ProductList v-if="show_products"></ProductList>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Header from "../components/Header"
import ProductList from "@/components/ProductList"
import { SET_PRODUCT_TO_BE_EDITTED } from "@/store/mutationTypes";

export default {
  name: 'InventoryView',
  components: {
    Header,
    ProductList,
  },
  data() {
    return {
      no_product: true,
      product: {},
      show_products: true,
    }
  },
  methods:{
    addButton() {
      this.addProduct()
    },
    addProduct(){
      this.$router.push({name: 'add_product'})
    },
    showDetails(product) {
      this.product = product
      this.show_products = false
      this.view_details = true
    }
  },
	computed: {
		...mapGetters({
			has_product: 'getHasProduct', // this should not be needed because it is already in <Inventory /> using to check if user has product
		}),
	},
  mounted() {
    this.has_product == true ? this.no_product = false : ''
    this.$store.commit(SET_PRODUCT_TO_BE_EDITTED, {})
  }
}
</script>

<style scoped>

</style>
