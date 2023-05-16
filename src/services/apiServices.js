import axios from "axios"
import * as urls from "./urls"

export const apiLogin = (data) => {
	return axios({
		method: "post",
		url: urls.loginUrl,
		data,
	});
}
export const fethcStoreInventory = (slug) => {
	axios({
		method: "get",
		url: `${urls.inventoryUrl}${slug}/`,
	})
}
export const fetchMetrics = (data) => {
	return axios({
		method: "post",
		url: urls.metricsUrl,
		data
	});
}
export const fetchOrders = () => {
	return axios({
		method: "get",
		url: urls.ordersUrl,
	});
}
export const fetchOrderItems = (id) => {
  return axios({
    method: "get",
    url: `${urls.orderItemsUrl}${id}/`,
  });
};
export const saveCustomer = (data) => {
	return axios({
		method: "post",
		url: urls.saveCustomerUrl,
		data
	});
}
export const saveOrder = (data) => {
	return axios({
		method: "post",
		url: urls.saveOrderUrl,
		data
	});
}
export const saveOrderItems = (data) => {
	return axios({
		method: "post",
		url: urls.saveOrderItemUrl,
		data
	});
}