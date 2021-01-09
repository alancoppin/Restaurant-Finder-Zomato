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
    async getRestaurants({ commit },params) {
      // let list = [0,20,40,60,80];
      let defaultParams = {
        entity_id : process.env.VUE_APP_CITY_ID,
        entity_type : 'city',
        sort : 'rating'
      };
      let allParams = {...defaultParams,...params};
      let data = [];
      try{
        const response = await axios.get('/search',{params : allParams});
        response.data.restaurants.map(item => {
          data.push(item);
        })
        commit('setStatus','success');
        commit('setRestaurants', data);
        // Load the next page
        // for (let i = 20; i<100;i = i + 20) {
        //   try{
        //     allParams.start = i;
        //     const response = await axios.get('/search',{params : allParams});
        //     if(response.data.restaurants){
        //       response.data.restaurants.map(item => {
        //         data.push(item);
        //       })
        //       commit('setRestaurants', data);
        //     }
        //   }catch (e){
        //     console.error(e)
        //   }
        // }
      }catch (e){
        console.error(e)
      }
    },
    updateStatus({commit},status){
      commit('setStatus',status);
    },
  }
})