import { createRouter, createWebHistory } from 'vue-router'
import AddProduct from '../views/ProductAddOrEdit.vue'
import SaleAdd from '../views/SaleAdd.vue'
import CustomerAdd from '../views/CustomerAdd.vue'
import CustomerDetails from '../views/CustomerDetails.vue'
import CustomersView from '../views/CustomersView.vue'
import DashboardView from '../views/DashboardView.vue'
import IndexPage from '../views/IndexPage.vue'
import SalesView from '../views/SalesView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import ProductsView from '../views/ProductsView.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CustomersView.vue')
  },
  {
    path: '/add_customer/:origin',
    name: 'add_customer',
    component: CustomerAdd
  },
  {
    path: '/add_product',
    name: 'add_product',
    component: AddProduct
  },
  {
    path: '/add_sale/:origin',
    name: 'add_sale',
    component: SaleAdd
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Checkout.vue')
  },
  {
    path: '/customers',
    name: 'customers',
    component: CustomersView
  },
  {
    path: '/customer_details',
    name: 'customer_details',
    component: CustomerDetails
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/sales',
    name: 'sales',
    component: SalesView
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: ProductsView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue')
  },
  {
    path: '/product_details',
    name: 'product_details',
    component: ProductDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  let token = localStorage.getItem("leyyow_token")
  if(!token && to.name !== 'login') {
    return {name: 'login'}
  }
})
// ---------

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem("leyyow_token");

//   let whitelist = [
//     "/",
//     "/register",
//     "/login",
//     "/forgot_password",
//     "/set-new-password",
//     "/set-new-password/",
//     "/feedback/"
//     // {name: "Home"},
//   ];
//   // whitelist.some(item => console.log(to.path.includes(item), item))
//   if (whitelist.some(item => to.path.includes(item))) {
//     if (token) {
//       next({
//         name: "dashboard",
//       });
//     } else {
//       next();
//     }
//   } else {
//     if (token) {
//       next();
//     } else {
//       next({
//         name: "login",
//       });
//     }
//   }
// });

export default router
