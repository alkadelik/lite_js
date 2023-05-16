<template>
  <div class="container">
    <Header @add-button="addButton"></Header>
    <div>
      <!-- view proudct details -->
      <div v-if="header" id="detail-product-modal"  ref="close-product-modal" title="BootstrapVue">
        <div class="edit-product-body-wrapper">
          <div class="product-header">
            <h3 @click="$bvModal.hide('detail-product-modal')" class="close-popup">Product</h3>
          </div>
          <div class="product-body">
            <div class="img-wrapper">
              <img src="../assets/images/detail-products-image-1.png" alt="">
            </div>
            <div class="product-detail-wrapper">
              <div class="product-detail">
                <div class="row">
                  <div class="col-6">
                    <span>Product Name</span>
                  </div>
                  <div class="col-6">
                    <h3>Gaiai Dress, XL</h3>
                  </div>
                </div>
              </div>
              <div class="product-detail">
                <div class="row">
                  <div class="col-6">
                    <span>Price</span>
                  </div>
                  <div class="col-6">
                    <h3>N95,620.99</h3>
                  </div>
                </div>
              </div>
              <div class="product-detail">
                <div class="product-description">
                  <span>Description</span>
                  <p>Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s</p>
                </div>
              </div>
            </div>
            <div class="product-btn">
              <a href="#" class="btn-delete">Delete</a>
              <a href="#" class="btn-edit" v-div.edit-product-modal>Edit</a>
            </div>
          </div>
        </div>
      </div>

      <!-- edit product -->
      <div v-if="header" id="edit-product-modal"  ref="close-product-modal" title="BootstrapVue">
        <div class="product-body-wrapper">
          <div class="product-header">
            <h3 @click="$bvModal.hide('edit-product-modal')" class="close-popup">Edit Product</h3>
          </div>
          <div class="product-body">
            <h2 class="black">Edit product</h2>
            <p class="dark">Set the hours you are available to receive <br> orders.</p>
            <div class="form">
              <div class="form-group">
                <p class="dark label">Uplaod Product image <span>(Optional)</span> </p>
                <input type="file" id="editUploadProductImage" @change="previewImage" accept="image/*">
                <label for="editUploadProductImage" class="uploadProductImage">Drop image or <br>
                  click to upload</label>
                <div class="image-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData" alt="preview">
                </div>
              </div>
              <div class="form-group">
                <label for="edit-product-name">Product Name</label>
                <input type="text" id="edit-product-name" class="form-control" value="Gaiai Dress, XL">
                <span>give your product a short and clear name</span>
              </div>
              <div class="form-group">
                <label for="edit-product-price">Product Price</label>
                <input type="text" id="edit-product-price" value="N95,620.99" class="form-control">
              </div>
              <div class="form-group">
                <label for="product-description">Product Description <span>(Optional)</span></label>
                <textarea id="product-description" class="form-control">Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</textarea>
              </div>
              <div class="form-group">
                <input type="submit" value="Add Product" class="btn-style" @click="$bvModal.hide('edit-product-modal')">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header";
// import StarRating from 'vue-star-rating'

// Vue.component('star-rating', StarRating)


export default {
  name: 'ProductDetails',
  components: {
    Header,
    // StarRating
  },
  data() {
    return {
      imageData: "", // we will store base64 format of image in this string
      showProductInventory: false,
      noProduct: false,
      activeTab: '1',
      rating: 3.8,
      max: 50,
      fiveStarValue: 75,
      fourStarValue: 16,
      threeStarValue: 5,
      twoStarValue: 5,
      oneStarValue: 1,
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
      console.log('clicked')
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
}
</script>

<style scoped>

</style>
