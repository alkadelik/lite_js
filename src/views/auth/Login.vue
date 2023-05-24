<template>
	<form class="login-form">
		<h1>Login</h1>
		<label for="username">Username:</label>
		<input type="text" v-model="username" name="username" required>
		<label for="password">Password:</label>
		<input type="password" v-model="password" name="password" required>
		<button @click.prevent="Login">Login</button>
	</form>
</template>

<script>
import {
	apiLogin,
} from '@/services/apiServices'
import axios from 'axios'
import * as mutationTypes from '@/store/mutationTypes'

export default {
  name: 'LoginView',
  components: {
  },
	data: () => ({
		username: '',
		password: '',
	}),
	methods: {
		Login() {
			let data = { username: this.username, password: this.password}
			apiLogin(data)
			.then((res) => {
				localStorage.setItem("leyyow_token", res.data.token)
				axios.defaults.headers.common["Authorization"] = `Token ${res.data.token}`

				let store = res.data.store

				// For some reason, stor.slug isn't registering so I included it explicitly as  part
				// of the API response hence why it needs to be fetched as res.data.slug below, and then saved with the store.
				store.slug = res.data.slug
				// localStorage.setItem("store_slug", store.slug) // probably needed in gallery | perhaps put in the state

				this.$store.commit(mutationTypes.LOGGED_IN, true)
				this.$store.commit(mutationTypes.SAVE_STORE, store)
				this.$store.commit(mutationTypes.SAVE_STORE_SLUG, res.data.slug)
				this.$store.commit(mutationTypes.SAVE_SETTLEMENT, res.data.settlement)
				this.$store.commit(mutationTypes.SAVE_ACCOUNT_ID, res.data.account_id)
				this.$store.commit(mutationTypes.SAVE_STORE_CUSTOMERS, res.data.customers)
				this.$store.commit(mutationTypes.SAVE_INVENTORY, res.data.inventory)

				if (store.verified[0] == 0) {
					this.$store.commit(mutationTypes.EMAIL_VERIFIED, false) // check if this ever changes to true
				}
				this.$router.push("/dashboard")
			})
			.catch(() => {
				// EventBus.$emit(
				// 	"open_alert",
				// 	"error",
				// 	"Wrong or invalid credentials. Please try again"
				// )
				console.log(
					"open_alert",
					"error",
					"Wrong or invalid credentials. Please try again"
				)
			})
			.finally(() => {
				this.loading = false
			});
		}
	}
}
</script>

<style scoped>
/* Reset styles */

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

/* Typography */

body {
	font-family: Arial, sans-serif;
	font-size: 16px;
	line-height: 1.5;
	color: #333;
}

h1 {
	margin-bottom: 1rem;
	font-weight: bold;
	font-size: 2rem;
}

label {
	display: block;
	margin-bottom: 0.5rem;
}

input[type="text"], input[type="password"] {
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-bottom: 1rem;
	width: 100%;
}

button[type="submit"] {
	background-color: #333;
	color: #fff;
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button[type="submit"]:hover {
	background-color: #666;
}

</style>