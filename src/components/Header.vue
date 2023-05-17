<template>
    <div class="header">
      <header id="header">
        <div class="container">
          <div class="page_title row">
            <div class="col-6 align-self-center">
              <a href="#"><strong v-html="pageTitle"></strong></a>
            </div>
            <div class="align-self-center">
              <div class="user-header-wrapper" v-if="userProfile === true">
                <div class="bell-icon">
                  <img src="../assets/images/icons/notification-bell-icon.svg" alt="bell icon">
                </div>
                <label class="author-profile">
                  <img src="../assets/images/header-author-image.png" alt="Author Image">
                </label>
                <div class="form">
                  <select id="authorLogin">
                    <option value="Login">Login</option>
                    <option value="Signup">Signup</option>
                  </select>
                </div>
              </div>
              <div class="product-inventory-header" v-if="show_add_button">
                <a class="btn-style" @click="addEntity"><img src="../assets/images/icons/add-product-icon.svg" alt=""></a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <b-modal v-if="display" id="add-product-modal">
        <div class="product-body-wrapper">
          <div class="product-header">
            <h3 @click="$bvModal.hide('add-product-modal')" class="close-popup">Add Product</h3>
          </div>
          <div class="product-body">
            <h2 class="black">Add product</h2>
            <p class="dark">Set the hours you are available to receive <br> orders.</p>
            <div class="form">
              <form>
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
                  <input type="submit" value="Add Product" class="btn-style" @click="$bvModal.hide('add-product-modal')">
                </div>
              </form>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </template>
  
<script>
import { mapGetters } from 'vuex';
export default {
	name: 'HeaderComponent',
	props: [
    // 'isActive', // not sure why sales is sending this
	],
	data() {
		return {
			imageData: "", // we will store base64 format of image in this string
			showProductInventory: false,
			noProduct: false,
      show_add_button: false,
		}
	},
	methods:{
    addEntity() {
      this.$emit('addButton')
    },
		previewImage: function (event) {
			// Reference to the DOM input element
			var input = event.target;
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
	},
  computed: {
    ...mapGetters({
      position: 'getComponentSettings',
    })
  },
  mounted() {
    switch(this.position.display_header) {
      case 0:
        this.show_add_button=false
        break;
      case 1:
      case 2:
      case 3:
        this.show_add_button=true
    }

    // this.emitter.on('hideHeader', (state) => this.show_add_button = state)
  }
}

  /* 
  DOCUMENTATION
  Computed:
  the switch case controls the display of the header and it's constituent elements across the app.
  Every view and component where the header is imported emits an index to let the Header know what to display

  */
</script>
  
<style scoped>
.header {
  margin-bottom: 14px;
}
.page_title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.product-inventory-header a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  height: 30px;
  padding: 5px;
  margin-left: auto;
  background: #4CAF50;
}
</style>
