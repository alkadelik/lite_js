<template>
	<div class="cart_item" v-for="item, i in cart" :key="i">
		<div class="img_wrapper">
			<!-- <img src="../assets/images/inventory-product-image-1.png" alt=""> -->
			<img :src="'http://127.0.0.1:8000' + item.product_image" alt="product image">
		</div>
		<div class="item_details">
			<p class="name">{{ item.product_name }}</p>
			<div class="price">
				<h3>&#8358;{{ item.price }}</h3>
				<img src="../assets/images/icons/edit-price-icon.svg" alt="">
			</div>
			<div class="qty">
				<span class="dark">{{ item.variant_1 }}, {{ item.variant_2 }}</span>
				<!-- <Variants :count="item.count" :id="item.id"></Variants> -->
				<div class="counter">
					<div class="counter-button" @click="decrease(i)">
						<img src="../assets/images/icons/counter-minus-icon.svg" alt="">
					</div>
					<div class="number">
						<p>{{ item.count }}</p>
					</div>
					<div class="counter-button" @click="increase(i)">
						<img src="../assets/images/icons/counter-plus-icon.svg" alt="">
					</div>
				</div>
			</div>
		</div>
	</div>

	<div v-if="vegan" id="edit-price-modal" centered title="BootstrapVue"><!-- change price when adding sales if different -->
		<div class="edit-price-body-wrapper">
			<div class="product-body">
				<h2 class="black">Hi,champ</h2>
				<p class="dark">We understand price changes to have an accurate sales record Input the actual
					amount you sold the product.</p>
				<div class="form">
					<div class="form-group">
						<label for="edit-price">Enter amount sold</label> <br>
						<input type="text" class="form-control" id="edit-price">
					</div>
					<div class="form-group">
						<input type="submit" class="btn-style" value="Change Price">
					</div>
				</div>
			</div>
		</div>
	</div>

	<a class="btn-style float-btn-style" @click="selectCustomer">Select or add buyer</a>
</template>

<script>
import { mapGetters } from 'vuex';
import * as mutationTypes from '@/store/mutationTypes'
// import Variants from './Variants.vue';

export default {
	name: 'CartComponent',
	components: {
		// Variants,
	},
	data: () => ({
		cart: [],
	}),
	methods: {
		decrease(i) {
			let product = this.cart[i]
			product.count--
			
			// if (this.checkStock(product)) {
		        //   product.count++
		        //   product.subTotal = product.discountAmt
		        //     ? (product.count * (product.price - product.discountAmt))
		        //     : (product.count * product.price)
		        //   this.$store.commit(mutationTypes.SAVE_CART, this.cart)
		        // }	
		},
		increase(i) {
			let product = this.cart[i]
			product.count++
		},
    // removeFromCart(i) {
    //   // Deletes all instances of a product while viewing cart
    //   this.cart.splice(i, 1)
    //   this.$store.commit(mutationTypes.SAVE_CART, this.cart);
    // },
		selectCustomer() {
			this.$store.commit(mutationTypes.SAVE_CHECKOUT_CART, this.cart)
			this.$emit('selectCustomer')
		},
	},
	computed: {
		...mapGetters({
			cart_map: 'getCartMap',
			inventory: 'getInventory',
			unpacked_cart: 'getUnpackedCart',
		}),
	},
	mounted() {
		if (this.cart_map.length > 0) {
			let unpacked_cart = []
			let inventory = this.inventory
			// const basket = this.cart_map.map(function(item_id){
			this.cart_map.map(item_id => {
				let obj = inventory.find(item => item.id == item_id)

				obj.count > 0 ? '' : obj.count = 1 // doing this in case cart is coming from local storage and already has count
				unpacked_cart.push(obj) // check that these are independent objects not references
				
				// let new_obj = Object.create(obj)
				// new_obj.count = 1
				// cart_array.push(new_obj) // check that these are independent objects not references
			})
			// console.log('basket is', basket) // why is const basket not working?
			this.$store.commit(mutationTypes.SAVE_UNPACKED_CART, unpacked_cart)
			this.cart = unpacked_cart
		}

    this.$store.commit(mutationTypes.SET_NAVIGATION, 21)
  }
}
</script>

<style scoped>
.cart_item {
	/* display: flex;
	flex-direction: row; */
	background: #ffffff;
	box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.04);
	border-radius: 20px;
	padding: 9px;
	display: grid;
	grid-template-columns: 35% 60%;
	grid-gap: 15px;
}
.cart_item:not(:last-of-type) {
	margin-bottom: 11px;
}
.img_wrapper {
	/* display: flex; */
	/* align-items: center; */
	/* justify-content: center; */
	height: 111px;
	/* border-radius: 20px; */

	/* width: 100%; */
  /* height: 91px; */
  border: 0.5px solid grey;
  border-radius: 8px;
  overflow: hidden;
}
.img_wrapper img {
	width: 100%;
}
.item_details {
	text-align: left;
}
.name, .price h3, .counter p {
	margin: 0
}
.price {
	padding: 5px 0;
}
.price h3, .price img {
	display: inline-block;
}
.price h3 {
	margin-right: 5px;
}
.qty, .counter {
	display: flex;
	flex-direction: row;
}
.qty {
	justify-content: space-between;
}
.counter {
	align-items: center;
	justify-content: space-around;
	min-width: 78px;
	min-height: 32px;
	background: #F8F8F8;
	border-radius: 4px;
}
.counter img {
	vertical-align: middle;
}
.number {
	background: #E9E9E9;
	border-radius: 4px;
	min-width: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 32px;
}
</style>
