<template>
	<div>
		Checkout summary (please confirm that everyting is correct - modal)
    <input v-model="shipping" placeholder="Enter shipping cost">
		<a class="btn-style float-btn-style" @click="saveOrderHandler">Save sale</a><!-- show only if in cart-->
	</div>

	<div v-if="vegan" id="sales-added-modal" centered title="BootstrapVue">
		<div class="sales-added-body-wrapper">
			<div class="product-body">
				<img src="../assets/images/icons/sales-added-check-icon.svg" alt="">
				<h2 class="black">Sales Added</h2>
				<p class="dark">A link has been sent to customer_name <br>
					to give feedback.</p>
			</div>
		</div>
	</div>

	<div v-if="vegan" id="deliver-fulfilled-modal" centered title="BootstrapVue">
		<div class="deliver-fulfilled-body-wrapper">
			<div class="product-body">
				<img src="../assets/images/icons/sales-added-check-icon.svg" alt="">
				<h2 class="black">Delivery</h2>
				<p class="dark">Have all products been <br> Fulfilled?</p>
				<a href="#" class="btn-style" @click="$bvModal.hide('deliver-fulfilled-modal')">Cancel</a>
				<a href="#" class="btn-style" @click="$bvModal.hide('deliver-fulfilled-modal')">Yes</a>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import {
	saveOrder,
	saveOrderItems,
} from '@/services/apiServices'

export default {
	name: 'CheckoutView',
	data: () => {
		return {
			has_customer: false,
			orderID: '',
      shipping: 0,
		}
	},
	methods: {
		createOrderID() {
      var ref_type ='2'; // '1' for purchase by merchant's customer
      var rand_int = Math.floor(Math.random() * 9999) + 1000;
      const today = new Date();
      var year = today
        .getFullYear()
        .toString()
        .slice(-2);
      var store_id = this.store.id.toString(); // this allows for up to 9999 stores merchants
      // var customer_id = '0000' // 0 for anonymous
      var month = (today.getMonth() + 1).toString(); // cause month is 0 indexed
      var day = today.getDate().toString();
      var cart_count = this.cart.length.toString();
      var hour = today.getHours().toString();
      var minute = today.getMinutes().toString();
      var second = today.getSeconds().toString();
      if (hour.length == 1) {
        hour = "0" + hour;
      }
      if (minute.length == 1) {
        minute = "0" + minute;
      }
      if (second.length == 1) {
        second = "0" + second;
      }
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      if (cart_count.length == 1) {
        cart_count = "0" + cart_count;
      }
      if (store_id.length == 1) {
        store_id = "000" + store_id;
      }
      if (store_id.length == 2) {
        store_id = "00" + store_id;
      }
      if (store_id.length == 3) {
        store_id = "0" + store_id;
      }
      // this.orderID = store_id + month + day + cart_count + hour + minute + customer_id + year
      this.orderID =
        ref_type + store_id + month + day + cart_count + year + rand_int;
    },
		saveOrderHandler() {
			this.createOrderID()

			let data = {
        items_count: this.cart_objects.length,
        total_amount: Number(this.shipping) + this.totalBeforeShipping,
        unique_items: this.cart.length,
        order_ref: this.orderID,
        products_total: this.totalBeforeShipping,
        store: this.store.id,
        shipping: this.shipping,
				has_customer: this.has_customer,
        customer_id: this.customer_id,

        // email: this.customerInfo.email,
        // address: this.customerInfo.address,
        // first_name: this.customerInfo.firstname,
        // last_name: this.customerInfo.lastname,
        // phone: this.customerInfo.phone,
        // city: '-',
      }

			saveOrder(data)
        .then(() => {
          saveOrderItems(this.orderItems)
        })
        .catch(() => {
        })
        .finally(() => {
          // give success message
          // redirect to sales // show orders
        })
		},
	},
	computed: {
		...mapGetters({
			cart: 'getCartItems',
			cart_objects: 'getCartObjects',
			customer_id: 'getCheckoutCustomer',
			store: 'getStore',
		}),
		orderItems() {
      return this.cart_objects.map((item, i) => {
        var order_item = {};
        order_item.index = i + 1;
        order_item.order = this.orderID;
        order_item.product = item.id;
        order_item.selected_option1 = item.selected_option;
        order_item.selected_option2 = item.selected_option2;
        order_item.qty = item.count;
        order_item.productid = item.id;
        order_item.sub_total = Number(item.price * 1); // this should be item.count
        order_item.image_url = item.product_image;
        order_item.has_feedback = item.has_feedback;
        return order_item;
      })
		},
    totalBeforeShipping() {
      return this.cart_objects.reduce((total, item) => {
        return (total + item.price) // should be item.count
      }, 0)
    },
	},
	mounted() {
		this.customer_id != 0 ? this.has_customer = true : ''
	}
}
</script>