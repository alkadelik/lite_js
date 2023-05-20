<template>
  <div class="">
    <div class="header">
      <div class="page_title">
        <div>
          <slot></slot>
        </div>
        <div></div><!-- do not remove. used to justify-content: space-between -->
        <div class="">
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
      show_back_button: true,
		}
	},
	methods:{
    addEntity() {
      this.$emit('addButton')
    },
    back() {
      this.$emit('back')
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
			location: 'getComponentSettings',
		}),
	},
  mounted() {
    switch(this.location.header_settings) {
      case 0:
        this.show_add_button=false
        this.show_back_button=false
        break;
      // case 10: // product detail has issues
      // case 11:
      // case 20: // shop floor has issues
      // case 21: // cart. did not load. Should have over-riden shop floor
      // case 22:
      // case 30:
      // case 31: // add customer. has issues
      //   this.show_add_button=false
      //   this.show_back_button=true
      //   break;
      case 1:
      case 2:
      case 3:
        this.show_add_button=true
        this.show_back_button=false
        break;
      // case 12:
        // this.show_back_button=true
        // break;
    }
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
  align-items: end;
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
h3 {
  margin-left: 15px;
  font-size: 18px;
  font-weight: bold;
}
.close-popup::before {
  content: url(http://127.0.0.1:8081/img/page-back-icon.ee1c1bcf.svg);
  position: relative;
  left: -10px;
  top: 1px;
}
</style>
