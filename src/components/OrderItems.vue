<template>
	<div class="items" :class="{'active' : manageOrder}">

			<div class="product-detail">
				<div class="img-wrapper">
					<img src="../assets/images/accordion-product-img-1.png" alt="">
				</div>

				<div class="name">
					<p class="p">{{ item.product_name }}</p>
					<p>Qty: {{ item.qty }}</p>
				</div>
				
			</div>
			<div class="price">
				<div class="product-price">
					<p class="p">&#8358;{{ item.sub_total }}</p>
					<span class="active">Fulfilled</span>
				</div>
			</div>
		</div>

</template>

<script>
export default {
	name: 'OrderItems',
	props: [
		'item',
	],
}
</script>

<style scoped>
.items {
}
	.items, .product-detail {
		display: flex;
		flex-direction: row;
	}
	.items {
		justify-content: space-between;
		text-align: left;
	}
	.items img {
		height: 50px;
		margin-right: 10px;
	}
	.items p {
		margin: 0;
	}
	.product-detail {
		margin-bottom: 20px;
	}
</style>