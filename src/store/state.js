export default {
  account_id: null,
  cart_map: [], // formerly cart
  cart_unpacked: [],
  cart_checkout: [],
  customers: [],
  checkout_customer: {},
  component_settings: {
    header_settings: null, // used
    // display_navigation: null,
    display_next_button: null,
    // display_add_button: null,
    // display_back_button: null,
    page_title: '',
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
  to_be_editted: {},
  unregistered_email: "",
  unsaved_change: false,
  visitor_inventory: {},
}