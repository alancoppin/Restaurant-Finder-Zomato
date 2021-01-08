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
    categories : {}
  },
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    getCategories({ commit }) {
      axios.get('/categories')
          .then(response => {
            commit('setCategories', response.data)
          })
    }
  },
  modules: {
  }
})