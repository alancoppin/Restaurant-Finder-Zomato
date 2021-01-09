import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurants : {},
    // Status of the process
    status : 'pending',
  },
  getters :  {
    // Get all restaurant form state.restaurants
    allRestaurants : (state) => state.restaurants,
    // Get single restaurant with an ID
    singleRestaurant : (state) => (resutaurantID) => state.restaurants.filter(item => item.restaurant.id === resutaurantID),
    // Get status from the store
    getStatus : (state) => state.status,
  },
  mutations: {
    // Set Data to state.restaurants
    setRestaurants (state, dataRestaurant) {
      state.restaurants = dataRestaurant
    },
    // Set status in the state
    setStatus (state,status) {
      state.status = status;
    },
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
            commit('setRestaurants', data);
            commit('setStatus','success');
          })
          .catch((e)=>{
            console.error(e);
          })
    },
    updateStatus({commit},status){
      commit('setStatus',status);
    },
  }
})