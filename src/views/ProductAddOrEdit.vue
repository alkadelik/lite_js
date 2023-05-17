<template>
  <div class="container">
    <div>
      <div v-if="!product.id" id="add-product-modal"  ref="close-product-modal" title="BootstrapVue">
        <div class="product-body-wrapper nav-margin-top">
          <div class="product-body">
            <div class="form">
              <div class="form-group">
                <p class="dark label">Uplaod Product image <span>(Optional)</span> </p>
                <input type="file" id="uploadProductImage" @change="previewImage" accept="image/*">
                <label for="uploadProductImage" class="uploadProductImage"> Tap here to select product image</label>
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
                <button class="btn-style float-btn-style" @click="createProduct">Add Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else id="edit-product-modal"  ref="close-product-modal" title="BootstrapVue">
        <div class="product-body-wrapper">
          <div class="product-header">
            <h3 @click="$bvModal.hide('edit-product-modal')" class="close-popup">Edit {{ product.product_name }}</h3>
          </div>
          <div class="product-body">
            <div class="form">
              <div class="form-group">
                <p class="dark label">Edit Product image</p>
                <input type="file" id="editUploadProductImage" @change="previewImage" accept="image/*">
                <label for="editUploadProductImage" class="uploadProductImage">Tap here to change produt image</label>
                <div class="image-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData" alt="preview">
                </div>
              </div>
              <div class="form-group">
                <label for="edit-product-name">Product Name</label>
                <input type="text" id="edit-product-name" class="form-control" v-model="product_edit.product_name">
              </div>
              <div class="form-group">
                <label for="edit-product-price">Product Price</label>
                <input type="text" id="edit-product-price" v-model="product_edit.price" class="form-control">
              </div>
              <div class="form-group">
                <label for="product-description">Product Description <span>(Optional)</span></label>
                <textarea id="product-description" class="form-control" v-model="product_edit.description"></textarea>
              </div>
              <div class="form-group">
                <button class="btn-style float-btn-style" @click="editProduct">Save edits</button>
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
  data() {
    return {
      imageData: "", // we will store base64 format of image in this string
      product_edit: {
        product_name: '',
        price: '',
        description: '',
      }
    }
  },
  methods:{
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
    createProduct(){
      console.log('clicked')
    },
    editProduct() {

    }
  },
	computed: {
		...mapGetters({
      product: 'getProductToBeEditted'
		}),
	},
  mounted() {
    this.product_edit.product_name = this.product.product_name
    this.product_edit.price = this.product.price
    this.product_edit.description = this.product.description
  }
}
</script>

<style scoped>
.image-preview {
  width: 330px;
}
img {
  width: 100%;
}
.form {
  text-align: left;
}
.form-group {
  margin-bottom: 24px;
}
.form label {
  color: #0C3E26;
  margin-bottom: 8px;
}
.form label.uploadProductImage {
  background: #FDFDFD;
  border: 0.5px dashed rgba(20, 62, 50, 0.25);
  border-radius: 8px;
  padding: 35px 50px;
  width: 100%;
  color: #69747E;
  text-align: center;
}
.form input[type="file"] {
  display: none;
}
p, .p {
  color: #9C9C9C;
}
</style>
