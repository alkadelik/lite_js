<template>
  <div class="">
    <div class="header">
      <div class="page_title">
        <div>
          <h3 v-if="show_back_button" @click="back" class="close-popup">{{ back_to }}</h3>
        </div>
        <div class="product-inventory-header">
          <a  v-if="show_add_button" class="btn-style" @click="addEntity"><img src="../assets/images/icons/add-product-icon.svg" alt=""></a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'HeaderComponent',
	props: [
    'back_to',
	],
	data() {
		return {
      show_add_button: true,
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
	},
  computed: {
		...mapGetters({
			location: 'getComponentSettings',
		}),
	},
  mounted() {
    switch(this.location.header_settings) {
      case 10: // View product details | product detail has issues
      case 11: // Edit product
      case 12: // Add product
      case 20: // shop floor (should show add button in future so users can add product on the go) | controls shop floor and customer list for adding sales
      case 21: // cart
      case 22: // checkout
      case 30: // customer details
      case 31: // add customer
        this.show_add_button=false
        this.show_back_button=true
        break;
      case 32: // add customer during sale
        this.show_add_button=true
        this.show_back_button=true
        break;
      case 1: // Inventory
      case 2: // Sales
      case 3: // Customers
        this.show_add_button=true
        this.show_back_button=false
        break;
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
  color: #4F635A;
}
.close-popup::before {
  content: url(http://127.0.0.1:8081/img/page-back-icon.ee1c1bcf.svg);
  position: relative;
  left: -10px;
  top: 1px;
}
</style>
