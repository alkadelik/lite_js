import { createStore } from 'vuex'
import * as mutationTypes from './mutationTypes'


// import VuexPersistence from "vuex-persist";
// Vue.use(Vuex);

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   key: "leyyow",
//   // reducer: state => ({
//   //   store: state.store,
//   //   settlement: state.settlement,
//   //   inventory: state.inventory,
//   //   orders: state.orders,
//   // })
// });

export default createStore({
  state: {
    account_id: null,
    cart: [],
    cart_objects: [],
    customers: [],
    checkout_customer: {},
    component_settings: {
      display_header: null,
      display_navigation: null,
      display_next_button: null,
      display_add_button: null,
    },
    email_verified: false,
    filter_option: 'Customer name',
    has_product: false,
    has_customer: false,
    has_sale: false,
    inventory: [],
    logged_in: false,
    metrics: {},
    settings: false, // view settings menu
    settlement: {},
    store: {},
    store_slug: "",
    orders: [],
    to_be_editted: null,
    unregistered_email: "",
    unsaved_change: false,
    visitor_inventory: {},
  },
  mutations: {
    [mutationTypes.EMAIL_VERIFIED](state, data) {
      state.email_verified = data;
    },
    [mutationTypes.SAVE_ORDERS](state, data) {
      state.orders = data;
      state.orders.length > 0 ? state.has_sale = true : ''
    },
    [mutationTypes.LOGOUT]() {
      // state.store = data;
      // localStorage.removeItem("leyyow")
    },
    [mutationTypes.LOGGED_IN](state, data) {
      state.logged_in = data;
    },
    [mutationTypes.SAVE_EMAIL](state, data) {
      state.unregistered_email = data;
    },
    [mutationTypes.SAVE_METRICS](state, data) {
      state.metrics = data;
    },
    [mutationTypes.SAVE_NEW_CUSTOMER](state, data) {
      state.customers.push(data);
    },
    [mutationTypes.SAVE_NAVIGATION](state, data) {
      state.component_settings.display_header = data;
    },
    [mutationTypes.SAVE_SELECTED_CUSTOMER](state, data) {
      state.checkout_customer = data;
    },
    [mutationTypes.SAVE_STORE](state, data) {
      state.store = data;
    },
    [mutationTypes.SAVE_CART](state, data) {
      state.cart = data;
    },
    [mutationTypes.SAVE_CART_OBJECTS](state, data) {
      state.cart_objects = data;
    },
    [mutationTypes.SAVE_STORE_CUSTOMERS](state, data) {
      state.customers = data;
      state.customers.length > 0 ? state.has_customer = true : ''
    },
    [mutationTypes.SAVE_STORE_SLUG](state, data) {
      state.store_slug = data;
    },
    [mutationTypes.SAVE_SETTLEMENT](state, data) {
      state.settlement = data;
    },
    [mutationTypes.SAVE_ACCOUNT_ID](state, data) {
      state.account_id = data;
    },
    [mutationTypes.SAVE_INVENTORY](state, data) {
      state.inventory = data;
      state.inventory.length > 0 ? state.has_product = true : ''
    },
    [mutationTypes.SAVE_VISITOR_INVENTORY](state, data) {
      state.visitor_inventory = data;
    },
    [mutationTypes.SET_PRODUCT_TO_BE_EDITTED](state, data) {
      state.to_be_editted = data;
    },
    [mutationTypes.SET_SETTINGS_STATE](state, data) {
      state.settings = data;
    },
    [mutationTypes.UPDATE_EMAIL_VERIFIED](state, data) {
      state.email_verified = data;
      // console.log(state, data)
    },
    [mutationTypes.SET_FILTER_OPTION](state, data) {
      state.filter_option = data;
    },
    [mutationTypes.UNSAVED_CHANGE](state, data) {
      state.unsaved_change = data;
    },

  },
  getters: {
    getCartItems: (state) => state.cart,
    getCartObjects: (state) => state.cart_objects,
    getCheckoutCustomer: (state) => state.checkout_customer,
    getCustomers: (state) => state.customers,
    getEmail: (state) => state.unregistered_email,
    getEmailStatus: (state) => state.email_verified,
    getFilterOption: (state) => state.filter_option,
    getHasCustomer: (state) => state.has_customer,
    getHasProduct: (state) => state.has_product,
    getHasSale: (state) => state.has_sale,
    getMetrics: (state) => state.metrics,
    getComponentSettings: (state) => state.component_settings,
    getInventory: (state) => state.inventory,
    getLoggedIn: (state) => state.logged_in,
    getOrders: (state) => state.orders,
    getProductToBeEditted: (state) => state.to_be_editted,
    getSettingsState: (state) => state.settings,
    getSettlement: (state) => state.settlement,
    getStore: (state) => state.store,
    getStoreSlug: (state) => state.store_slug,
    getUnsavedChange: (state) => state.unsaved_change,
  },
  actions: {},
  modules: {},
  // plugins: [vuexLocal.plugin],
});
