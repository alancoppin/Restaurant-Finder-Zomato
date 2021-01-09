import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurants : {}
  },
  getters :  {
    // Get all restaurant form state.restaurants
    allRestaurants : (state) => state.restaurants,
    // Get single restaurant with an ID
    singleRestaurant : (state) => (resutaurantID) => state.restaurants.filter(item => item.restaurant.id === resutaurantID),
  },
  mutations: {
    // Set Data to state.restaurants
    setRestaurants (state, data) {
      state.restaurants = data
    }
  },
  actions: {
    // Get Restaurant from the API
    getRestaurants({ commit },params) {
      let defaultParams = {
        entity_id : process.env.VUE_APP_CITY_ID,
        entity_type : 'city',
      };
      let allParams = {...defaultParams,...params};
      return axios.get('/search',{
            params : allParams
          })
          .then(response => {
            let data = response.data.restaurants;
            commit('setRestaurants', data)
          })
          .catch((e)=>{
            console.error(e);
          })
    }
  }
})