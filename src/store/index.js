import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import * as Helpers from "@/Helpers/filter";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurants : {},
    filteredRestaurants : {},
    // Status of the process
    status : 'pending',
    filter : {
    }
  },
  getters :  {
    getAllRestaurants : (state) => state.restaurants,
    getFilteredRestaurants : (state) => state.filteredRestaurants,
    // Get single restaurant with an ID
    singleRestaurant : (state) => (resutaurantID) => state.restaurants.filter(item => item.restaurant.id === resutaurantID),
    getStatus : (state) => state.status,
  },
  mutations: {
    // Set Data to state.restaurants
    setRestaurants (state, dataRestaurant) {
      state.restaurants = dataRestaurant
    },
    // Set Data to state.filteredRestaurants
    setFilteredRestaurants (state, dataRestaurant) {
      state.filteredRestaurants = dataRestaurant
    },
    // Set status in the state
    setStatus (state,status) {
      state.status = status;
    },
    // Set filter rating in the state
    setFilter(state,filter) {
      state.filter = {...filter};
    },
    // Filter the restaurants and store it into state.filteredRestaurants
    filterRestaurants(state) {
      state.filteredRestaurants = Helpers.filterRestaurants(state.restaurants,state.filter);
    }
  },
  actions: {
    // Get Restaurant from the API
    async getRestaurants({ commit,state },params) {
      // let list = [0,20,40,60,80];
      let defaultParams = {
        entity_id : process.env.VUE_APP_CITY_ID,
        entity_type : 'city',
      };
      let allParams = {...defaultParams,...params};
      let data = [];
      try{
        const response = await axios.get('/search',{params : allParams});
        response.data.restaurants.map(item => {
          data.push(item);
        })
        await commit('setRestaurants', data);
        // if state.filter.cost and state.filter.rating exist, use it to filter data from the API
        if(state.filter.cost && state.filter.rating){
          await commit('setFilteredRestaurants', Helpers.filterRestaurants(data,state.filter));
        }
        // if filter is empty, display all
        else{
          await commit('setFilteredRestaurants', data);
        }
        await commit('setStatus','success');
      }catch (e){
        console.error(e);
        commit('setRestaurants', []);
        commit('setFilteredRestaurants', []);
      }
    },
    // Update Filter rating
    async updateFilter({commit,dispatch},filter){
      await commit('setFilter',filter);
      // Run the filtering on state.restaurants
      dispatch('filterRestaurants');
    },
    // Action to filter restaurants
    async filterRestaurants({commit}){
      await commit('filterRestaurants');
      await commit('setStatus','success');
    },
    // Update status
    async updateStatus({commit},status){
      await commit('setStatus',status);
    },
  }
})