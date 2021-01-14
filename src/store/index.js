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
    city_id : null,
    filter : {
    }
  },
  getters :  {
    getAllRestaurants : (state) => state.restaurants,
    getFilteredRestaurants : (state) => state.filteredRestaurants,
    // Get single restaurant with an ID
    singleRestaurant : (state) => (resutaurantID) => state.restaurants.filter(item => item.restaurant.id === resutaurantID),
    getStatus : (state) => state.status,
    getCityID: (state) => state.city_id,
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
    },
    // Set the city ID
    setCityID(state,city){
      state.city_id = city
    }
  },
  actions: {
    // Get Restaurant from the API
    async getRestaurants({ commit,state },params) {
      // let list = [0,20,40,60,80];
      let defaultParams = {
        entity_id : state.city_id,
        entity_type : 'city',
      };
      let allParams = {...defaultParams,...params};
      try{
        const data = await axios.get('/search',{params : allParams}).then(response => response.data.restaurants);

        commit('setRestaurants', data);
        // if state.filter.cost and state.filter.rating exist, use it to filter data from the API
        if(state.filter.cost && state.filter.rating){
          commit('setFilteredRestaurants', Helpers.filterRestaurants(data,state.filter));
        }
        else{
          // if filter is empty, display all
          commit('setFilteredRestaurants', data);
        }
        commit('setStatus','success');
      }catch (e){
        console.error(e);
        commit('setRestaurants', []);
        commit('setFilteredRestaurants', []);
        commit('setStatus','success');
      }
    },
    // Update Filter rating
    async updateFilter({commit,dispatch},filter){
      commit('setFilter',filter);
      // Run the filtering on state.restaurants
      await dispatch('filterRestaurants');
    },
    // Action to filter restaurants
    async filterRestaurants({commit}){
      commit('filterRestaurants');
      commit('setStatus','success');
    },
    // Update status
    async updateStatus({commit},status){
      commit('setStatus',status);
    },
    // Get the city through the API
    async getCity({commit},coordinates){
      try{
        await axios.get('/geocode',{params : coordinates}).then(response =>{
          commit('setCityID',response.data.location.city_id);
        });
      }catch(e){
        console.log(e);
        commit('setCityID',null);
      }
    }
  }
})