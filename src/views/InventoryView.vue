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
    <div v-else>
      <ProductList v-if="show_products"></ProductList>
      <AddOrEdit v-if="add_product" :product="product"></AddOrEdit>
      <ProductDetails v-if="show_details" :product="product"></ProductDetails>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header";
import AddOrEdit from "@/components/ProductAddOrEdit";
import ProductDetails from "@/components/ProductDetails";
import ProductList from "@/components/ProductList";

export default {
  name: 'InventoryView',
  components: {
    AddOrEdit,
    Header,
    ProductDetails,
    ProductList,
  },
  data() {
    return {
      add_product: false,
      no_product: true,
      product: {},
      show_products: true,
    }
  },
  methods:{
    addButton() {
      this.addProduct()
    },
    addProduct(product){
      product ? this.product = product : this.product = {}
      this.no_product = false
      this.show_products = false
      this.add_product = true
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
  }
}
</script>

<style scoped>

</style>
