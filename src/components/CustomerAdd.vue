<template>
	<div id="add-new-customer-modal" class="create_customer">
		<div class="add-customer-body-wrapper">
			<div class="product-header">
				<h3 @click="$bvModal.hide('add-new-customer-modal')" class="close-popup">Add Customer</h3>
			</div>
			<div class="product-body">
				<h2 class="black">Add Customer</h2>
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
						<input v-model="customer.address" id="your-address" class="form-control">
					</div>
					<div class="form-group">
						<label for="your-phone">Phone number</label>
						<input v-model="customer.phone" type="tel" id="your-phone" class="form-control">
					</div>
					<div class="form-group">
						<button class="btn-style" @click="createCustomer">Save customer</button>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div id="detail-customer-modal" style="display: none"><!-- customer detail -->
		<div class="edit-product-body-wrapper edit-customer-body-wrapper">
			<div class="product-header">
				<h3 @click="$bvModal.hide('detail-customer-modal')" class="close-popup">Product</h3>
			</div>
			<div class="product-body">
				<div class="img-wrapper">
					<img src="../assets/images/customer-detail-img.png" alt="">
					<h2 class="h2">Mariam Alade</h2>
				</div>
				<div class="product-detail-wrapper">
					<div class="product-detail">
						<div class="row">
							<div class="col-4">
								<span>Email</span>
							</div>
							<div class="col-8">
								<h3>Mariam@gmail.com</h3>
							</div>
						</div>
					</div>
					<div class="product-detail">
						<div class="row">
							<div class="col-4">
								<span>Address</span>
							</div>
							<div class="col-8">
								<h3>No. 15a Idejo Str, Victoria Island</h3>
							</div>
						</div>
					</div>
					<div class="product-detail">
						<div class="row">
							<div class="col-4">
								<span>Phone number</span>
							</div>
							<div class="col-8">
								<h3>09014567839</h3>
							</div>
						</div>
					</div>
				</div>
				<div class="product-btn">
					<a href="#" class="btn-delete">Delete</a>
					<a href="#" class="btn-edit">Edit</a>
				</div>
			</div>
		</div>
	</div>


	<div v-if="vegan" id="add-customer-modal"  ref="close-product-modal" title="BootstrapVue"><!-- add new customer during checkout-->
		<div class="add-customer-body-wrapper">
			<div class="product-header">
				<h3 @click="$bvModal.hide('add-customer-modal')" class="close-popup">Add Customer</h3>
			</div>
			<div class="product-body">
				<h2 class="black">Add Customer</h2>
				<p class="dark">Create a profile for your customers to <br>
					constantly engage them.</p>
				<div class="form">
					<div class="row">
						<div class="col-6">
							<div class="form-group">
								<label for="first-name">First Name</label>
								<input type="text" id="first-name" class="form-control">
							</div>
						</div>
						<div class="col-6">
							<div class="form-group">
								<label for="last-name">Last Name</label>
								<input type="text" id="last-name" class="form-control">
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="your-email">Email Address</label>
						<input type="email" id="your-email" class="form-control">
					</div>
					<div class="form-group">
						<label for="your-email">Address</label>
						<input type="text" id="your-address" class="form-control">
					</div>
					<div class="form-group">
						<label for="your-phone">Phone number</label>
						<input type="tel" id="your-phone" class="form-control">
					</div>
					<div class="product-delivery-status">
						<p class="dark label">Has this product been Delivered</p>
						<div class="form-group">
							<input id="delivered" name="delivery-status" type="radio">
							<label for="delivered" class="radio-label">Delivered</label>
							<span>Receipt and feedback will be sent to the customer</span>
						</div>
						<div class="form-group">
							<input id="not-delivered" name="delivery-status" type="radio">
							<label for="not-delivered" class="radio-label">Not +Delivered</label>
							<span>Receipt and feedback will be sent to the customer</span>
						</div>
					</div>
					<div class="form-group">
						<input type="submit" value="Add Sale" class="btn-style" @click="closeAllModals">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { saveCustomer } from '@/services/apiServices'
import { SAVE_NEW_CUSTOMER } from '@/store/mutationTypes'
// import store from '@/store'

export default {
	name: 'AddCustomer',
	data:() => ({
		customer: {
			'first_name': '',
			'last_name': '',
			'email': '',
			'phone': '',
			'address': '',
			'city': '',
		},
		mango: '',
	}),
	methods: {
		createCustomer() {
			// check that it's complete before submitting
			saveCustomer(this.customer)
			.then((res) => {

				this.$store.commit(SAVE_NEW_CUSTOMER, res.data.customer)
			})
			// give success/failed feedback
			// stay on if merchant wants to add another customer
		}
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