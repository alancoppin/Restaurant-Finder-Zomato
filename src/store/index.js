import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurants : {}
  },
  getters :  {
    allRestaurants : (state) => state.restaurants.restaurants,
    singleRestaurant : (state) => (resutaurantID) => state.restaurants.restaurants.filter(item => item.restaurant.id === resutaurantID)
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