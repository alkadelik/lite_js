<template>
	<div class="accordion">
		<div class="accordion-item">
			<h2 class="accordion-header">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#panel' + index" aria-expanded="false" :aria-controls="'panel' + index" @click="getOrderItems">
					<div class="order-details">
						<div class="">
							<div class="order-customer">
								<h3>{{ customer.first_name }} <span class="call">Call</span></h3>
							</div>
							<p>&#8358;{{ order.products_total }}</p>
						</div>
						<div class="date">
							<div>
							#<p class="ellipses">{{ order.order_ref }}</p>&#x2022;
								<p style="margin-left: 5px;">{{ order_date }} {{ ordinal_suffix }} {{ order_date == 'Today' || order_date == 'Yesterday' ? '' :parseInt(order.created.substring(0, 4)) }}</p>
							</div>
							<p>{{ order.fulfilled }}/{{ order.items_count }}</p>
						</div>
						<div id="fulfillment">
							<p>
								{{ order.unique_items }} items
								<!-- {{ order.unique_items > 1 ? `& ${order.unique_items - 1} other items` : "" }} -->
							</p>
							<p class="pending">Pending</p>
						</div>
					</div>
				</button>
			</h2>
			<div :id="'panel' + index" class="accordion-collapse collapse order-items">
				<div class="item-header">
					<p class="p">Products</p>
					<a href="#"><span>Check all</span></a>
				</div>

				<OrderItems v-for="item, i in order_items" :key="i" :item="item"></OrderItems>

				<div class="customer-accordion">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#customer' + index" aria-expanded="false" :aria-controls="'customer' + index">
							Customer details
						</button>
					</h2>
					<div :id="'customer' + index" class="accordion-collapse collapse">
						<ul class="customer-details">
							<li>
								<img src="../assets/images/icons/customer-name-icon.svg" alt="">
								<p>{{ customer.first_name }} {{ customer.last_name}}</p>
							</li>
							<li>
								<img src="../assets/images/icons/customer-email-icon.svg" alt="">
								<p>{{ customer.email }}</p>
							</li>
							<li>
								<img src="../assets/images/icons/customer-phone-icon.svg" alt="">
								<p>{{  customer.phone }}</p>
							</li>
							<li>
								<img src="../assets/images/icons/customer-location-icon.svg" alt="">
								<p>{{ customer.line1 }} {{ customer.line2 }} {{ customer.city }} {{ customer.state }}</p>
							</li>
							<button>Share order info</button>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchOrderItems } from '@/services/apiServices'
import OrderItems from '@/components/OrderItems'

export default {
	name: 'OrdersComponent',
	components: {
		OrderItems,
	},
	props: [
		'order',
		'index',
	],
	data: () => {
		return {
			order_items: [],
		}
	},
	methods: {
		getOrderItems() {
			fetchOrderItems(this.order.order_ref)
			.then((res) => {
				this.order_items = res.data
			})
		}
	},
  computed: {
		...mapGetters({
			customers: 'getCustomers'
		}),
    order_date() {
      const ms_per_day = 1000 * 60 * 60 * 24;
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const ty = ["Today", "Yesterday"];
      let order_year = parseInt(this.order.created.substring(0, 4));
      let order_month = parseInt(this.order.created.substring(5, 7)) - 1;
      let order_date = parseInt(this.order.created.substring(8, 10));
      const today = new Date();
      const this_day = today.getDay(); // position in week
      const utc1 = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const utc2 = Date.UTC(order_year, order_month, order_date);
      let difference = Math.floor((utc1 - utc2) / ms_per_day);
      if (difference > 6) {
        return months[order_month] + " " + order_date;
      } else if (difference > 1) {
        if (this_day - difference < 0) {
          //  months[order_month] +  " - " +
          return months[order_month] + " " + order_date;
        }
        return (
          months[order_month] + days[this_day - difference] + " - " + order_date
        );
      } else {
        return ty[difference];
      }
    },
    ordinal_suffix() {
      let order_date = parseInt(this.order.created.substring(8, 10));
      var j = order_date % 10,
        k = order_date % 100;
      if (j == 1 && k != 11) {
        return "st";
      }
      if (j == 2 && k != 12) {
        return "nd";
      }
      if (j == 3 && k != 13) {
        return "rd";
      }
      if(this.order_date == 'Today' || this.order_date == 'Yesterday'){
        return ''
      }
      return "th";
    },
		customer() {
			return this.customers.find(customer =>
				customer.id == this.order.customer
			)
		}

  },
}
</script>

<style scoped>
.order-details {
	display: flex;
	flex-direction: column;
}
/* .order-details div { */
.order-details div {
	display: flex;
	justify-content: flex-start;
	width: 300px;
	color: #445B54;
}
h3 {
	margin: 0;
  font-size: 18px;
  font-weight: bold;
}
.ellipses {
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 70px;
	direction: rtl;
	text-align: left;
	margin-right: 5px;
}
.date p {
	margin-bottom: 10px;
}
.date ul {
	padding: 0;
}
.order-items {
	/* border: 1px solid pink; */
	background: #F4F4F4;
	border-radius: 8px;
	margin: 15px;
	padding: 10px;
}
.item-header {
	display: flex;
	justify-content: space-between;
}
.call {
	font-size: 18px;
	font-weight: lighter;
	color: #4CAF50;
	padding: 2px 10px;
	background: #F4FFF4;
	border-radius: 42px;
}
.customer-details {
	background: #FFF;
	border: 0.5px solid grey;
	border-radius: 8px;
	padding: 10px;
	/* padding: 0; */
	text-align: left;
}
.customer-details li {
	display: flex;
	padding-bottom: 10px;
}
.customer-details p {
	margin: 0;
	padding-left: 10px;
}
.customer-details button {
	padding: 10px;
	width: 100%;
	border-radius: 8px;
	border: none;
}
#fulfillment p {
	margin: 0;
}
#fulfillment {
	display: flex;
	justify-content: space-between;
}
.accordion-button {
	padding: 15px;
}
.accordion-button:not(.collapsed) {
	background-color: none;
	color: #445B54;
}
.accordion-button:not(.collapsed)::after, .accordion-button::after {
  /* background-image: var(--bs-accordion-btn-active-icon); */
	background-image: none;
}
.accordion-header {
  /* background-color: none; */
}
.accordion-button:focus {
	box-shadow: none;
	border-color: rgba(0,0,0,.125);
}
.accordion {
	margin-bottom: 15px;
	--bs-accordion-active-bg: none;
}
</style>