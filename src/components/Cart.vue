<template>
	<div class="product-header">
		<h3 class="close-popup">Inventory</h3>
	</div>
	<div class="cart_item" v-for="item, i in cart" :key="i">
		<div class="img_wrapper">
			<img src="../assets/images/inventory-product-image-1.png" alt="">
		</div>
		<div class="item_details">
			<p class="name">{{ item.product_name }}</p>
			<div class="price">
				<h3>&#8358;{{ item.price }}</h3>
				<img src="../assets/images/icons/edit-price-icon.svg" alt="">
			</div>
			<div class="qty">
				<span class="dark">{{ item.variant_1 }}, {{ item.variant_2 }}</span>
				<div class="counter">
					<div class="counter-button" @click="decrease">
						<img src="../assets/images/icons/counter-minus-icon.svg" alt="">
					</div>
					<div class="number">
						<p>{{ count }}</p>
					</div>
					<div class="counter-button" @click="increase">
						<img src="../assets/images/icons/counter-plus-icon.svg" alt="">
					</div>
				</div>
			</div>
		</div>
	</div>
	<a class="btn-style float-btn-style" @click="selectCustomer">Next</a>
</template>

<script>
import { mapGetters } from 'vuex';
import { SAVE_CART_OBJECTS } from '@/store/mutationTypes'

export default {
	name: 'CartComponent',
	data: () => ({
		cart: [],
		count: 0,
	}),
	methods: {
		increase() {
			this.count ++
		},
		decrease() {
			this.count --
		},
		selectCustomer() {
			this.$store.commit(SAVE_CART_OBJECTS, this.cart)
			this.$emit('selectCustomer')
		},
	},
	computed: {
		...mapGetters({
			cart_items: 'getCartItems',
			inventory: 'getInventory'
		}),
	},
	mounted() {
		if (this.cart_items.length > 0) {
			let cart_array = []
			let inventory = this.inventory
			// const basket = this.cart_items.map(function(item_id){
			this.cart_items.map(function(item_id){
				let obj = inventory.find(item => item.id == item_id)

				obj.count = 1
				cart_array.push(obj) // check that these are independent objects not references
				
				// let new_obj = Object.create(obj)
				// new_obj.count = 1
				// cart_array.push(new_obj) // check that these are independent objects not references
			})
			// console.log('basket is', basket) // why is const basket not working?
			this.cart = cart_array
		}
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
	background-color: pink;

	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 111px;
	border-radius: 20px;
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