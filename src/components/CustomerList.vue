<template>
	<div id="select-customer-modal" title="BootstrapVue">
    <Header v-if="displayNextBtn" back_to="cart" @add-button="addButton" @back="back"></Header>
    <Header v-else @add-button="addButton"></Header>
		<div class="select-customer-body-wrapper">
			<div class="product-body">
				<p class="all-products">{{ customerCount }} customer<span v-if="customerCount > 1">s</span></p>
				<div class="search-products form">
					<input type="search" class="form-control" placeholder="Type customer name to search">
					<label for="searchCustomer"><img src="../assets/images/icons/search-icon.svg" alt=""></label>
					<input type="submit" id="searchCustomer">
				</div>
				<div 
					class="select-customer-wrapper"
					v-for="customer, i in customers" :key="i" 
					@click="selectFunction(customer.id, customer)"
				>
					<div class="list_style_1" :class="{ active: customer_id == customer.id}">
						<div style="display: flex">
							<div class="customer_img">
								<img src="../assets/images/icons/select-customer-author-icon.svg" alt="">
							</div>
							<h3>{{ customer.first_name }} {{ customer.last_name }}</h3>
						</div>
						<div class="customer_details">
							<p class="black">{{ customer.house_no }} {{ customer.line1 }} {{ customer.line2 }} {{ customer.city }}</p>
							<p>{{ customer.phone }} &#x2022; {{ customer.email }}</p>
						</div>
					</div>
				</div>
				<a class="btn-style float-btn-style" @click="checkout" v-if="displayNextBtn">Go to checkout</a><!-- show only if in cart-->
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as mutationTypes from '@/store/mutationTypes'
import Header from "../components/Header";
export default {
	name: 'CustomerList',
	components: {
		Header,
	},
	props: [
		'origin',
	],
	data: () => {
		return {
			customer_id: 0,
		}
	},
	methods: {
		addButton() {
      this.addCustomer()
    },
		addCustomer() {
      this.$router.push({name: 'add_customer', params: {origin: this.origin}})
		},
		back() {
			this.$router.go(-1)
		},
		checkout() {
      this.$store.commit(mutationTypes.SAVE_SELECTED_CUSTOMER, this.customer_id)
			this.$router.push({name: 'checkout'})
		},
		selectFunction(id, customer) {
			if(this.displayNextBtn) {
				this.toggleSelectedCustomer(id)
			} else {
				this.$store.commit(mutationTypes.SET_CUSTOMER_TO_EDIT, customer)
				this.$router.push({name: 'customer_details'})
			}
		},
    toggleSelectedCustomer(id) {
			switch(this.customer_id) {
				case 0:
					this.customer_id = id
					break;
				case id:
					this.customer_id = 0
					break;
				default:
					this.customer_id = id
			}
    },
	},
	computed: {
		...mapGetters({
			customers: 'getCustomers',
			position: 'getComponentSettings'
		}),
		customerCount() {
			return this.customers.length
		},
		displayNextBtn() {
			return this.position.display_next_button
		},
	},
	beforeMount() {
		this.$store.commit(mutationTypes.SET_HEADER_SETTINGS, 32) // this shows the back button even in Customer menu. Should distinguish between from Sale and Customer menu
	}
}
  /* 
  DOCUMENTATION
	methods:
	selectFunction(id) {
		Displaying the button to go to the next step means that the merchant is in the process of adding a customer to a sale i.e. the next step is the checkout step. Otherwise, this function directs the merchant to view customer details from within the Customer menu.
	}

  */
</script>

<style scoped>
.select-customer-wrapper {
	cursor: pointer;
}
.list_style_1 {
	/* display: flex; */
	/* flex-direction: row; */
	padding: 15px;
	margin-bottom: 15px;
	border: 1px solid #4CAF50; /* active */
	border: 1px solid #E2E8F0;
	border-radius: 8px;
}
.customer_details, .all-products {
	/* padding-left: 15px; */
	text-align: left;
}
h3 {
  margin: 7px 0 0 10px;
  font-size: 20px;
  font-weight: bold;
  color: #445B54;
}
.customer_details p {
	margin: 0;
	padding: 2px 0;
}
.active {
	border: 1px solid #4CAF50;
}
</style>