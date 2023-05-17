<template>
  <div class="header">
    <div class="">
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
			position: 'getComponentSettings'
		}),
		// displayAddBtn() {
		// 	return this.position.display_add_button
		// }
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

    // this.position.display_add_button == false ? 
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
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  z-index: 2;
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
  width: 48px;
  min-width: 40px;
  height: 40px;
  padding: 5px;
  margin-left: auto;
  background: #4CAF50;
}
</style>
