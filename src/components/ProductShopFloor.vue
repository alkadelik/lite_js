<template>
  <div class="sale-inventory-wrapper">
    <p>Select products for this sale</p>
    <div class="form products">
      <div class="form-group product" v-for="product, i in inventory" :key="i" @click="toggleProductInCart(product.id)">
        <input type="checkbox" :id="'product' + i">
        <label :for="'product' + i">
          <div class="sale-inventory-card">
            <div class="img-wrapper">
              <img :src="'http://127.0.0.1:8000' + product.product_image" alt="product image">
              <!-- <img src="../assets/images/inventory-product-image-1.png" alt=""> -->
            </div>
            <p class="product-name">{{ product.product_name }}</p>
          </div>
        </label>
      </div>
    </div>
    <a class="btn-style float-btn-style" @click="goToCart">View cart</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as mutationTypes from '@/store/mutationTypes'

export default {
	name: 'SalesInventory',
	data() {
    return {
      cart_map: [],
    }
  },
  methods: {
    toggleProductInCart(id) {
      // vue is running my scripts twice thus immediately an item is added to cart_map,
      // it is immediately removed on the next check thus I need to write my code differently
      // or only add to cart for now (so it's not actually toggling)
      let index = this.cart_map.indexOf(id)
      index == -1 ? this.cart_map.push(id) : '' // this.cart_map.splice(index, 1) 
    },
    goToCart() {
      this.$store.commit(mutationTypes.SAVE_CART_MAP, this.cart_map)
      this.$emit('openCart')
    }
  },
	computed: {
		...mapGetters({
			inventory: 'getInventory',
		})
	},
  mounted() {
    this.$store.commit(mutationTypes.SET_NAVIGATION, 20)
  }
}
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: 33% 33% 32%;
  align-items: center;
  justify-content: center;
  gap: 3px;
}
.product input {
  display: none;
}
label {
  position: relative;
  cursor: pointer;
  display: block;
}
.form label {
  color: #0C3E26;
  margin-bottom: 8px;
}
label::before {
  content: "";
  /* -webkit-appearance: none; */
  background-color: transparent;
  border: 2px solid #171717;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 8px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 10px;
}
input:checked + label::after {
  content: "";
  display: block;
  position: absolute;
  top: 14px;
  right: 17px;
  width: 6px;
  height: 10px;
  border: solid #171717;
    border-top-width: medium;
    border-right-width: medium;
    border-bottom-width: medium;
    border-left-width: medium;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.form .form-group:nth-of-type(2n+1) .sale-inventory-card {
  background: #CEF6D4;
}
.form .form-group:nth-of-type(2n) .sale-inventory-card {
  background: #F9EEEB;
}
.form .form-group .sale-inventory-card {
  border-radius: 10px;
  padding: 18px;
  min-height: 143px;
  margin-bottom: 3px;
}
.img-wrapper {
  border-radius: 8px;
  overflow: hidden;
  height: 80px;
}
.sale-inventory-card .img-wrapper img {
  display: block;
  max-width: 80px;
  margin: auto;
  min-height: 72px;
  -o-object-fit: cover;
  object-fit: cover;
}
img {
  border-style: none;
}
.sale-inventory-card p {
  background: rgba(255, 255, 255, 0.5);
  -webkit-backdrop-filter: blur(304px);
  backdrop-filter: blur(304px);
  border-radius: 4px;
  min-width: 90px;
  padding: 8px 5px;
  margin-top: 10px;
  color: #111827;
  margin: 5px 0;
  font-size: 12px;
}
</style>