<template>
	<div class="container dashboard-top-margin">
    <div class="header">
      <h3>{{ store.store_name }}</h3>
      <div class="form">
        <select id="authorLogin" v-model="menu_option" @change="menuOption">
          <option value="logout">Logout</option>
          <!-- <option value="Signup">Signup</option> -->
        </select>
      </div>
    </div>
		<section id="dashboard">
			<div class="container">
				<div class="welcome">
					<h3>Good {{ timeOfDay }}</h3>
          <p class="">Here’s how is your bussiness is doing</p>
				</div>
  
				<div class="report-wrapper">
					<div class="report-card" v-for="data, i in metrics" :key="i">
						<div class="img-wrapper">
              <component :is="data.icon" />
						</div>
						<div class="content-wrapper">
							<p>{{ data.title }}</p>
							<div class="total">
								<h3 class="h3"><span v-if="data.currency == 1">&#8358;</span>{{ data.data }}</h3>
								<span class="triangle-arrow">
                  {{ data.data > 0 ? "+" : "-" }} {{ data.percent }}%
                </span>
							</div>
							<span>vs {{ data.period }}</span>
						</div>
					</div>
				</div>
  
				<div class="dashboard-chart-wrapper">
					<div class="dashboard-chart-header">
            <div class="content-wrapper">
              <div class="total">
                <p>Total sale</p>
                <span class="triangle-arrow">+25%</span>
              </div>
              <h3 class="h3">N200,000.00</h3>
            </div>
            <div class="form">
              <select v-model="period" @change="updateMetrics">
                <option value="0">Today</option>
                <option value="1">This week</option>
                <option value="2">This month</option>
                <option value="3">This year</option>
                <!-- <option value="4">Year to date</option> -->
              </select>
            </div>
					</div>
					<!-- <LineChartGenerator
						:chart-options="chartOptions"
						:chart-data="chartData"
						:chart-id="chartId"
						:dataset-id-key="datasetIdKey"
						:plugins="plugins"
						:css-classes="cssClasses"
						:styles="styles"
						:width="width"
						:height="height"
					/> -->
					<span class="space">YOU made an extra <strong>N20,000</strong> this week</span>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
	fetchOrders,
  fetchMetrics,
} from '@/services/apiServices'
import * as mutationTypes from '@/store/mutationTypes'
import * as dayjs from "dayjs";

import Arrows from "@/components/icons/Arrows"
import Profile from "@/components/icons/Profile"
import Transaction from "@/components/icons/Transaction.vue"
import Sale from "@/components/icons/Sale.vue"
import Cart from "@/components/icons/Cart.vue"
// import { Line as LineChartGenerator } from 'vue-chartjs'
// import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)

export default {
  name: 'DashboardView',
  components: {
    Arrows,
    Profile,
    Cart,
		// LineChartGenerator,
    Sale,
    Transaction,
  },
	props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
	data:() => {
    return {
      chartData: {
        labels: [
          'Mon',
          'Tue',
          'Wed',
          'Thur',
          'Fri',
          'Sat',
          'Sun'
        ],
        datasets: [
         /* {
            label: 'Data One',
            backgroundColor: '#FFC350',
            data: [40, 39, 10, 40, 39, 80, 40],
            fill: false,
          },*/
          {
            label: 'Data One',
            borderColor: '#7549FF',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            // radius: 0,
            pointBorderColor: '#FFC350',
            backgroundColor: '#FFC350',
            data: [40, 39, 10, 40, 39, 80, 40],
            fill: false,
          },
         /* {
            label: 'Data Two',
            borderColor: '#05CBE1',
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
            borderWidth: 1,
            radius: 0,
            fill: true,
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0,0,0,160);

              gradient.addColorStop(0, 'green');
              gradient.addColorStop(.5, 'cyan');
              gradient.addColorStop(1, 'green');

              return gradient;
            },
            tension: 0.25,
            data: [60, 55, 32, 10, 2, 12, 53]
          }*/
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.5
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#92959E'
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: '#92959E'
            },
            grid: {
              display: false
            }
          },
        },

      },
      menu_option: '',
      time_frame: 'Today',
      period: 1, // [1,2,3,4]:[today, week, month, year]
    }
  },
	methods: {
    logout() {
      localStorage.clear() // not really clearing all local items. maybe mutate store before logout
      this.$store.commit(mutationTypes.LOGGED_IN, false) // maybe not clear everything E.g the cart. store in the server?
      this.$router.push('/login') // or some other page that has helhpful info
    },
    menuOption() {
      switch(this.menu_option) {
        case 'logout':
          this.logout()
          break;
      }
    },
    updateMetrics() {
      fetchMetrics(this.period)
      .then((res) => {
        this.$store.commit(mutationTypes.SAVE_METRICS, res.data)
      })
    }
	},
	computed: {
		...mapGetters({
      metrics: 'getMetrics',
      orders: 'getOrders',
      store: 'getStore',
		}),

    timeOfDay() {
      let hrs = dayjs().get("hours");
      return hrs < 12
        ? "morning"
        : hrs >= 12 && hrs < 6
        ? "afternoon"
        : "evening";
    },
	},
	mounted() {
    this.updateMetrics()

    fetchOrders() // do this in orders in orders, maybe?
      .then((res) => {
        this.$store.commit(mutationTypes.SAVE_ORDERS, res.data)
      })
      .catch(() => {
        // EventBus.$emit(
        // 	"open_alert",
        // 	"error",
        // 	"Wrong or invalid credentials. Please try again"
        // )
      })
      .finally(() => {
        this.loading = false
      })

      

    // this.verified = this.store?.verified;
    // console.log(this.verified)

    // if (this.verified) {
    //   for (var i = 1; i < this.verified.length; i++) {
    //     // starting loop from 1 not 0
    //     this.dashboard[i - 1].status = parseInt(this.verified[i]); // the i==0 is the email status
    //     if (this.store.verified[i] == 1) {
    //       this.setup_steps += 1;
    //     }
    //   }
    //   if (this.verified[0] == 0) {
    //     this.$store.commit(mutationTypes.EMAIL_VERIFIED, false);
    //   } else {
    //     this.$store.commit(mutationTypes.EMAIL_VERIFIED, true);
    //   }
    // }
	}
}
</script>

<style scoped>
.dashboard-top-margin {
  margin-top: 120px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  z-index: 2;
}
.welcome {
  text-align: left;
}
.report-wrapper {
  background: #F9F9F9;
  border: 0.5px solid #F9F9F9;
  border-radius: 16px;
  padding: 14px 14px 24px;
  margin-bottom: 16px;
}
.report-card {
  padding: 16px 16px;
  display: grid;
  grid-template-columns: 48px auto;
  align-items: self-start;
  grid-gap: 14px;
  text-align: left;
  background: #ffffff;
  border: 0.5px solid #E2E8F0;
  box-shadow: -2px 8px 16px rgba(181, 181, 181, 0.08);
  border-radius: 8px;
}
.report-card p, .report-card h3 {
  margin: 0;
}
.report-card:not(:last-of-type) {
  margin-bottom: 16px;
}
.img-wrapper {
  background: rgba(0, 179, 255, 0.08); /* blue */
  background: rgba(255, 195, 80, 0.08); /* yellow */
  background: rgba(248, 78, 140, 0.08); /* pink */
  border-radius: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
p {
  color: #9C9C9C;
}
.total {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 5px 0 0;
  font-size: 12px;
  font-weight: bold;
}
.triangle-arrow::before {
  /* content: url(http://127.0.0.1:8080/img/dashboard-triangle-icon.97f0869f.svg); */
  position: relative;
  left: -4px;
}
::before, ::after {
  box-sizing: border-box;
}
.total span {
  color: #4CAF50;
}
.dashboard-chart-header {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 40px;
}
.dashboard-chart-header p, h3 {
  margin: 0;
}
.space {
  margin-bottom: 50px;
}
select {
  background: url(http://127.0.0.1:8081/img/dropdown-arrow.7cfba250.svg), #fff;
  background-position-x: 0%, 0%;
  background-position-y: 0%, 0%;
  background-repeat: repeat, repeat;
  background-size: auto, auto;
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: auto 20%;
  height: 45px;
  padding: 5px 30px 5px 10px;
  color: #9C9C9C;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #C9C9C9 !important;
  border-radius: 7.79618px;
  }
</style>