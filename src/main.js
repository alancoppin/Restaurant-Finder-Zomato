import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from "axios";
import VueScreenSize from 'vue-screen-size'
import VueGeolocation from 'vue-browser-geolocation';

Vue.config.productionTip = false

// Sets axios defaults
axios.defaults.baseURL = 'https://developers.zomato.com/api/v2.1'
axios.defaults.headers.common['Accept'] = "application/json"
axios.defaults.headers.common['user-key'] = process.env.VUE_APP_ZOMATO_API_KEY


Vue.component('Loader', require('./components/RestaurantFinderLoader').default);

Vue.use(VueScreenSize)
Vue.use(VueGeolocation);


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
