import { createRouter, createWebHistory } from 'vue-router'
import AddProduct from '../views/ProductAddOrEdit.vue'
import AddSaleView from '../views/AddSaleView.vue'
import CustomerAdd from '../views/CustomerAdd.vue'
import CustomersView from '../views/CustomersView.vue'
import DashboardView from '../views/DashboardView.vue'
import SalesView from '../views/SalesView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import ProductsView from '../views/ProductsView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CustomersView.vue')
  },
  {
    path: '/add_customer',
    name: 'add_customer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CustomerAdd
  },
  {
    path: '/add_product',
    name: 'add_product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddProduct
  },
  {
    path: '/add_sale',
    name: 'add_sale',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddSaleView
  },
  {
    path: '/customers',
    name: 'customers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CustomersView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: DashboardView
  },
  {
    path: '/sales',
    name: 'sales',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SalesView
  },
  {
    path: '/inventory',
    name: 'inventory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ProductsView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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

export default router
