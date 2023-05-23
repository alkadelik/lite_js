<template>
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
</template>

<script>
import { mapGetters } from 'vuex';
import * as mutationTypes from '@/store/mutationTypes'

export default {
	name: 'CartVariants',
	props: [
		'count',
		'id'
	],
	data: () => ({
		product: {},
	}),
	methods: {
		increase() {
			this.product.count ++
		},
		decrease() {
			this.product.count --
		},
	},
	computed: {
		...mapGetters({
			cart_items: 'getUnpackedCart',
		}),
	},
	mounted() {
		this.product = this.cart_items.find(product => product.id = this.id)
		// this.product = this.inventory.find(product => product.id = this.id) // to check if inventory is mutated or separate objects
    this.$store.commit(mutationTypes.SET_NAVIGATION, 21) // some count-related mutation not this
  }
}
</script>

<style scoped>
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