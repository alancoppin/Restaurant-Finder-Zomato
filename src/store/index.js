import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

// Sets defaults
axios.defaults.baseURL = 'https://developers.zomato.com/api/v2.1'
axios.defaults.headers.common['Accept'] = "application/json"
axios.defaults.headers.common['user-key'] = process.env.VUE_APP_ZOMATO_API_KEY

export default new Vuex.Store({
  state: {
    restaurants : {}
  },
  getters :  {
    allRestaurants : (state) => state.restaurants.restaurants
  },
  mutations: {
    setRestaurants (state, restaurant) {
      state.restaurants = restaurant
    }
  },
  actions: {
    getRestaurants({ commit }) {
      return axios.get('/search',{
            params : {
              entity_id : process.env.VUE_APP_CITY_ID,
              entity_type : 'city',
              count : 100
            }
          })
          .then(response => {
            commit('setRestaurants', response.data)
          })
          .catch((e)=>{
            console.error(e);
          })
    }
  }
})