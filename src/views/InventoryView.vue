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
      <ProductList></ProductList>
      <AddOrEdit></AddOrEdit>
      <ProductDetails></ProductDetails>
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
      no_product: true,
    }
  },
  methods:{
    addButton() {
      this.addProduct()
    },
    previewImage: function (event) {
      // Reference to the DOM input element
      var input = event.target;
      console.log("hello")
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    addProduct(){
      this.has_product = false
      this.showProductInventory = true;
      this.noProduct = true;
    },
    setRating: function(rating) {
      this.rating = rating;
    }
  },
	computed: {
		...mapGetters({
			has_product: 'getHasProduct', // this should not be needed because it is already in <Inventory /> using to check if user has product
		}),
	},
  mounted() {
    this.has_product == true ? this.no_product = false : ''
    // if (this.has_sale == true) {
    //   this.no_sale = false
    // }
  }
}
</script>

<style scoped>

</style>
