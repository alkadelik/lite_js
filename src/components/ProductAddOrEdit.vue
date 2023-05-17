<template>
  <div class="container">
    <div>
      <div v-if="!product.id" id="add-product-modal"  ref="close-product-modal" title="BootstrapVue">
        <div class="product-body-wrapper">
          <div class="product-header">
            <h3 @click="$bvModal.hide('add-product-modal')" class="close-popup">Add Product</h3>
          </div>
          <div class="product-body">
            <h2 class="black">Add product</h2>
            <p class="dark">Set the hours you are available to receive <br> orders.</p>
            <div class="form">
              <div class="form-group">
                <p class="dark label">Uplaod Product image <span>(Optional)</span> </p>
                <input type="file" id="uploadProductImage" @change="previewImage" accept="image/*">
                <label for="uploadProductImage" class="uploadProductImage">Drop image or <br>
                  click to upload</label>
                <div class="image-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData" alt="preview">
                </div>
              </div>
              <div class="form-group">
                <label for="product-name">Product Name</label>
                <input type="text" id="product-name" class="form-control">
                <span>give your product a short and clear name</span>
              </div>
              <div class="form-group">
                <label for="product-price">Product Price</label>
                <input type="number" id="product-price" class="form-control">
              </div>
              <div class="form-group">
                <label for="product-description">Product Description <span>(Optional)</span></label>
                <textarea id="product-description" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <input type="submit" value="Add Product" class="btn-style" @click="addProduct">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else id="edit-product-modal"  ref="close-product-modal" title="BootstrapVue">
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
import { mapGetters } from "vuex"
export default {
  name: 'AddOrEditProduct',
  components: {
  },
  props: [
    'product',
  ],
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
  mounted() {
    // this.emitter.emit('hideMenu', true)
  }
}
</script>

<style scoped>
.form {
  text-align: left;
}
.form label.uploadProductImage {
  background: #FDFDFD;
  border: 0.5px dashed rgba(20, 62, 50, 0.25);
  border-radius: 8px;
  padding: 35px 50px;
  width: 100%;
  display: block;
  font-size: 12px !important;
  font-weight: 400 !important;
  line-height: 19px !important;
  color: #69747E;
  text-align: center;
}
.form input[type="file"] {
  display: none;
}
p, .p {
  /* font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 18px !important; */
  /* font-family: "Graphik"; */
  color: #9C9C9C;
}
</style>
