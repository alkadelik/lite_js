<template>
	<div class="nav-margin-top">
		<Header back_to='select product' @back="back"></Header>
	</div>
	<div class="cart_item" v-for="item, i in cart" :key="i">
		<div class="img_wrapper">
			<!-- <img src="../assets/images/inventory-product-image-1.png" alt=""> -->
			<img :src="'http://127.0.0.1:8000' + item.product_image" alt="product image">
		</div>
		<div class="item_details">
			<p class="name">{{ item.product_name }}</p>
			<div class="price" @click="editPrice(i)" data-bs-toggle="modal" data-bs-target="#exampleModal">
				<h3>&#8358;{{ item.price }}<span>{{ item.new_price }}</span></h3>
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

	<!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">Update sale price</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<p>Input the price this item sold for if different from the store price. It only affects this sale and won't change anywhere else.</p>
					Product: {{ product.product_name }} <br>
					Current price: &#8358;{{ product.price }} <br>
					<input v-model="sale_price" placeholder="Enter sale price">
				</div>
				<div class="modal-footer">
					<button class="btn-style" @click="changePrice">Change price</button>
				</div>
			</div>
		</div>
	</div>

	<a class="btn-style float-btn-style" @click="selectCustomer">Select or add buyer</a>
</template>

<script>
import { mapGetters } from 'vuex';
import * as mutationTypes from '@/store/mutationTypes'
import Header from "../components/Header"

export default {
	name: 'CartComponent',
	components: {
		Header,
	},
	data: () => ({
		cart: [],
		product: {},
		sale_price: '',
	}),
	methods: {
		back() {
			this.$router.replace('add_sale/_') // ideally have the items still selected
		},
		changePrice() {
			this.product.sale_price = this.sale_price
			this.product.price_change = true
		},
		decrease(i) {
			let product = this.cart[i]
			product.count > 0 ? product.count -- : ''
			// if (this.checkStock(product)) {
			//   product.count++
			//   product.subTotal = product.discountAmt
			//     ? (product.count * (product.price - product.discountAmt))
			//     : (product.count * product.price)
			//   this.$store.commit(mutationTypes.SAVE_CART, this.cart)
			// }	
		},
		editPrice(i) {
			this.product = this.cart[i]
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
			this.$router.push({name: 'add_sale', params: {origin: 'cart'}}) // goes to customer from add_sale
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

			this.cart_map.map(item_id => {
				let obj = inventory.find(item => item.id == item_id)
				let  new_obj = {}
				Object.assign(new_obj, obj)

				new_obj.count > 0 ? '' : new_obj.count = 1 // in case cart is recovered from localStorage & has count. Ensure object not created twice
				unpacked_cart.push(new_obj)
			})
			this.$store.commit(mutationTypes.SAVE_UNPACKED_CART, unpacked_cart)
			this.cart = unpacked_cart
		}

  },
	beforeMount() {
    this.$store.commit(mutationTypes.SET_HEADER_SETTINGS, 21)
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
  border-radius: 20px;
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
	cursor: pointer;
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
.modal-content {
	border-radius: 30px;
	border: none;
}
.modal input {
	width: 100%;
	padding: 7px;
	border-radius: 5px;
	border: 1px solid gray;
}
.modal-footer button {
	width: 100%;
	padding: 12px;
}
</style>
