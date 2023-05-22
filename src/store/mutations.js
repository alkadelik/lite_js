import * as mutationTypes from './mutationTypes'

export default {
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
  // [mutationTypes.SET_ADD_BTN_DISPLAY](state, data) {
  //   state.component_settings.display_add_button = data;
  // },
  // [mutationTypes.SET_BACK_BTN_DISPLAY](state, data) {
  //   state.component_settings.display_back_button = data;
  // },
  [mutationTypes.SET_NAVIGATION](state, data) {
    state.component_settings.header_settings = data;
  },
  [mutationTypes.SET_NEXT_BTN_DISPLAY](state, data) {
    state.component_settings.display_next_button = data;
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
}