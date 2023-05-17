<template>
  <div class="inventory" :class="{'active' : showProductInventory}">
    <div class="" v-for="product, i in inventory" :key="i">
      <div class="product" @click="viewProductDetail(product)">
        <div class="img-wrapper" v-b-modal.detail-product-modal>
          <img :src="'http://127.0.0.1:8000' + product.product_image" alt="">
          <!-- <img src="../assets/images/product-img-3.png" alt=""> --><!-- use this if no image -->
        </div>
        <div class="content-wrapper">
          <h3>{{ product.product_name }} </h3>
          <p class="dark">&#8358;{{ product.price }}</p>
          <span>{{ product.description }}</span>
        </div>
      </div>
      <a>Product Review</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_PRODUCT_TO_BE_EDITTED } from "@/store/mutationTypes";

export default {
	name: 'InventoryComponent',
	data: () => {

	},
  methods: {
    viewProductDetail(product) { // should this edit or view detail or do both?
      this.$store.commit(SET_PRODUCT_TO_BE_EDITTED, product)
      this.$router.push({name: 'product_details'})
    }
  },
	computed: {
		...mapGetters({
			inventory: 'getInventory',
		})
	},
	mounted() {
	}
}
</script>

<style scoped>
.inventory {
  display: grid;
  grid-template-columns: 48% 48%;
  align-items: top;
  justify-content: center;
  gap: 15px;
  text-align: left;
}
h3 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #445B54;
}
h3::first-letter {
  text-transform: capitalize;
}
p {
  margin: 3px 0;
}
.product span {
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #848282;

  width: 160px;
  /* white-space: ; */
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  /* height:56px; */
}
.inventory a {
  display: block;
  text-decoration: underline !important;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  color: #4CAF50 !important;
  cursor: pointer;
}
.img-wrapper {
  width: 100%;
  height: 91px;
  border: 0.5px solid grey;
  border-radius: 8px;
  overflow: hidden;
}
.img-wrapper img {
  max-width: 100%;
}
.content-wrapper {
  margin-top: 5px;
}
</style>