<template>
	<div class="container">
    <Header v-if="customer_to_edit.id" back_to='customer details' @back="back"></Header>
    <Header v-else back_to='customer list' @back="back"></Header>
		<div v-if="!customer_to_edit" id="add-new-customer-modal" class="create_customer">
			<div class="add-customer-body-wrapper">
				<div class="product-header">
					<h3 @click="$bvModal.hide('add-new-customer-modal')" class="close-popup">Add Customer</h3>
				</div>
				<div class="product-body">
					<h2 class="black">Enter customer details</h2>
					<div class="form">
						<div class="row">
							<div class="col-6">
								<div class="form-group">
									<label for="first-name">First Name</label>
									<input v-model="customer.first_name" id="first-name" class="form-control">
								</div>
							</div>
							<div class="col-6">
								<div class="form-group">
									<label for="last-name">Last Name</label>
									<input v-model="customer.last_name" id="last-name" class="form-control">
								</div>
							</div>
						</div>
						<div class="form-group">
							<label for="your-email">Email Address</label>
							<input v-model="customer.email" type="email" id="your-email" class="form-control">
						</div>
						<div class="form-group">
							<label for="your-email">Address</label>
							<input v-model="customer.line1" id="your-address" class="form-control">
						</div>
						<!-- <div class="form-group">
							<label for="your-email">Local government area</label>
							<input v-model="customer.address" id="your-address" class="form-control">
						</div> -->
						<div class="form-group">
							<label for="your-phone">Phone number</label>
							<input v-model="customer.phone" type="tel" id="your-phone" class="form-control">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else id="add-new-customer-modal" class="create_customer">
			<div class="add-customer-body-wrapper">
				<div class="product-header">
					<h3 @click="$bvModal.hide('add-new-customer-modal')" class="close-popup">Add Customer</h3>
				</div>
				<div class="product-body">
					<h2 class="black">Enter customer details</h2>
					<div class="form">
						<div class="row">
							<div class="col-6">
								<div class="form-group">
									<label for="first-name">First Name</label>
									<input v-model="edit.first_name" id="first-name" class="form-control">
								</div>
							</div>
							<div class="col-6">
								<div class="form-group">
									<label for="last-name">Last Name</label>
									<input v-model="edit.last_name" id="last-name" class="form-control">
								</div>
							</div>
						</div>
						<div class="form-group">
							<label for="your-email">Email Address</label>
							<input v-model="edit.email" type="email" id="your-email" class="form-control">
						</div>
						<div class="form-group">
							<label for="your-email">Address</label>
							<input v-model="edit.line1" id="your-address" class="form-control">
						</div>
						<!-- <div class="form-group">
							<label for="your-email">Local government area</label>
							<input v-model="edit.address" id="your-address" class="form-control">
						</div> -->
						<div class="form-group">
							<label for="your-phone">Phone number</label>
							<input v-model="edit.phone" type="tel" id="your-phone" class="form-control">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="form-group">
			<button v-if="from == 'sales'" class="btn-style" @click="checkout">Go to checkout</button>
			<button v-else class="btn-style" @click="createCustomer">Save customer</button>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { saveCustomer } from '@/services/apiServices'
import * as mutationTypes from '@/store/mutationTypes'
import Header from "../components/Header"

export default {
	name: 'AddCustomer',
	components: {
		Header,
	},
	data:() => ({
		customer: {
			'first_name': '',
			'last_name': '',
			'email': '',
			'phone': '',
			'line1': '',
			'city': '',
		},
		edit: {
			'first_name': '',
			'last_name': '',
			'email': '',
			'phone': '',
			'line1': '',
			'city': '',
		},
		new_customer_id: 0,
		show_checkout: false,
	}),
	methods: {
    back() {
			this.customer_to_edit.id ? this.$router.go(-1) : this.$router.push({name: 'customers'})
      // if(this.customer_to_edit.id) {
      //   this.$router.go(-1)
      // } else {
      //   this.$router.push({name: 'customers'})
			// }
    },
		checkout() {
			this.createCustomer()
      this.$store.commit(mutationTypes.SAVE_SELECTED_CUSTOMER, this.new_customer_id)
			this.$router.push({name: 'add_sale', params: {origin: 'new_customer'}})
		},
		createCustomer() {
			// check that it's complete before submitting
			saveCustomer(this.customer)
			.then((res) => {
				this.new_customer_id = res.data.customer.id
				this.$store.commit(mutationTypes.SAVE_NEW_CUSTOMER, res.data.customer)
			})
			// give success/failed feedback
			// stay on if merchant wants to add another customer
		}
	},
	computed: {
		...mapGetters({
			customer_to_edit: 'getCustomerToEdit'
		}),
		from() {
			return this.$route.params.origin
		}
  },
	mounted() {
		this.edit.first_name = this.customer_to_edit.first_name
		this.edit.last_name = this.customer_to_edit.last_name
		this.edit.phone = this.customer_to_edit.phone
		this.edit.email = this.customer_to_edit.email
		this.edit.address = this.customer_to_edit.adress
		this.edit.city = this.customer_to_edit.city
	},
	beforeMount() {
    this.$store.commit(mutationTypes.SET_HEADER_SETTINGS, 31)
  }
}
</script>

<style scoped>
h2.black {
	text-align: left;
}
.create_customer {
	border: none;
	border-radius: 0;
}
.row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.col-6 {
  width: 160px;
}
.form-group {
  margin-bottom: 1rem;
}
.form label {
  color: #0C3E26;
	display: block;
	text-align: left;
}
.form input, .form textarea {
  height: 44px;
  border: 1px solid #E5E9F2;
  color: #0C3E26;
  font-size: 12px;
  font-weight: 400;
  line-height: 19px;
}
.form-control {
	display: block;
	width: 100%;
	height: calc(1.5em + 0.75rem + 2px);
	/* padding: 0.375rem 0.75rem; */
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #495057;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-style {
  width: 100%;
	margin-top: 20px;
}
</style>