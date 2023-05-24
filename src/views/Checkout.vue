<template>
  <div class="container">
    <Header back_to='select buyer' @back="back"></Header><!-- specifically back to cart, not customer select -->
    <div class="form nav-margin-top">
      <div class="form-group">
        <label for="your-email">Enter deliver fee if any</label>
        <input  v-model="shipping" class="form-control">
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

      <div class="payment-status">
        <p class="dark label">Has this order been pad for?</p>
        <div class="form-group">
          <input id="paid" name="payment-status" type="radio" value="1" @change="paymentStatus($event)">
          <label for="paid" class="radio-label">Yes</label>
        </div>
        <div class="form-group">
          <input id="not-paid" name="payment-status" type="radio" value="0" @change="paymentStatus($event)">
          <label for="not-paid" class="radio-label">No</label>
        </div>
      </div>
      <div class="delivery-status">
        <p class="dark label">Has this order been fulfilled?</p>
        <div class="form-group">
          <input id="delivered" name="delivery-status" type="radio" value="1" @change="fulfillmentStatus($event)">
          <label for="delivered" class="radio-label">Fulfilled</label>
          <span>A receipt and feedback request will be emailed to the customer</span>
        </div>
        <div class="form-group">
          <input id="not-delivered" name="delivery-status" type="radio" value="0" @change="fulfillmentStatus($event)">
          <label for="not-delivered" class="radio-label">Not fulfilled</label>
          <span>Only a receipt will be emailed to the customer</span>
        </div>
      </div>
    </div>
    <a class="btn-style float-btn-style" @click="saveOrderHandler">Save</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_HEADER_SETTINGS } from '@/store/mutationTypes'
import Header from "../components/Header"
import {
	saveOrder,
	saveOrderItems,
} from '@/services/apiServices'

export default {
	name: 'CheckoutView',
  components: {
    Header,
  },
	data: () => {
		return {
			has_customer: false,
			orderID: '',
      shipping: 0,
      fulfilled: null,
      payment_status: null,
		}
	},
	methods: {
    back() {
      this.$router.go(-1)
    },
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
      var cart_count = this.cart.length.toString(); // unique items (products) or absolute number of items? I go for absolute
      // var hour = today.getHours().toString();

      // hour = hour.padStart(2,"0")
      month = month.padStart(2,"0")
      day = day.padStart(2,"0")
      cart_count = cart_count.padStart(2,"0")
      store_id = store_id.padStart(4,"0")
      // ref_type + store_id + year + month + day + cart_count // + nth purchase of the day | this.customer_id.padStart(3,"0")
      this.orderID = ref_type + store_id + month + day + cart_count + year + rand_int
    },
    fulfillmentStatus(e) {
       this.fulfilled = e.target.value
    },
    paymentStatus(e) {
      this.payment_status = e.target.value
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
        fulfilled: this.fulfilled,
        payment_status: this.payment_status,

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
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          console.log('done')
        })
		},
	},
	computed: {
		...mapGetters({
			cart: 'getCartMap',
			cart_objects: 'getCheckoutCart',
			customer_id: 'getCheckoutCustomer',
			store: 'getStore',
		}),
		orderItems() {
      return this.cart_objects.map((item, i) => {
        var order_item = {};
        order_item.index = i + 1;
        order_item.order = this.orderID;
        order_item.product = item.id;
        order_item.price_sold = item.price; // ideally should be a new price if this was changed
        order_item.selected_option1 = item.selected_option;
        order_item.selected_option2 = item.selected_option2;
        order_item.qty = item.count;
        order_item.productid = item.id;
        order_item.sub_total = Number(item.price * item.count); // use new price if discount or manually changed
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
    this.$store.commit(SET_HEADER_SETTINGS, 22)
  }
}
</script>

<style scoped>
.form {
  text-align: left;
}
.delivery-status, .payment-status {
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  background: #F5F5F5;
  border: 0.5px solid #F3F3F3;
  border-radius: 8px;
  /* text-align: left; */
  margin-bottom: 25px;
}
.form-group:first-of-type {
  margin-bottom: 20px;
}
.form-group label {
  color: #0C3E26;
  font-weight: bold;
  margin-left: 11px;
}
.form-group span {
  display: block;
  margin-left: 25px;
  color: #626C7A;
}
</style>