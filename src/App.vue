<template>
  <div id="app" >
    <div class="app__loading" v-if="pending">
      <img :src="require('@/assets/images/three-dots.svg')" alt="Loading">
      <span>Getting restaurant...</span>
    </div>
    <div class="RestaurantFinder" v-else>
      <div class="RestaurantFinder__filters">
        <RestaurantFinderFilters :categories="categories" :cuisines="cuisines"></RestaurantFinderFilters>
      </div>
      <div class="RestaurantFinder__grip">
        <RestaurantFinderResults :restaurants="restaurants"></RestaurantFinderResults>
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantFinderFilters from "@/components/RestaurantFinderFilters";
import RestaurantFinderResults from "@/components/RestaurantFinderResults";

import axios from "axios";

export default {
  name: 'App',
  components: {
    RestaurantFinderFilters,
    RestaurantFinderResults,
  },
  data () {
    return {
      pending : true,
      categories : [],
      cuisines : [],
      restaurants : []
    }
  },
  methods : {
    /*
    ** Get categories data from the API
     */
    getCategories(){
      return axios.get('/categories')
          .then(response => {
            this.categories = response.data.categories
          })
          .catch(e => {
            console.error(e);
          })

    },
    /*
    ** Get cuisine data from the API
     */
    getCuisine(){
      return axios.get('/cuisines',{
        params : {
          city_id : process.env.VUE_APP_CITY_ID
        }
      })
          .then(response => {
            this.cuisines = response.data.cuisines
          })
          .catch(e => {
            console.error(e);
          })

    },
    /*
    ** Get restaurants data through the store
     */
    getRestaurants(){
      return this.$store.dispatch('getRestaurants')
          .then(()=> {
            this.restaurants = this.$store.getters.allRestaurants;
          })
          .catch((e)=>{
            console.error(e)
          })
    },
    /*
    **
     */
    hideLoading(){
      this.pending = false;
    },
    // Fetch all the data and hide the loading once the data are fetch
    async fetchData(){
      await this.getCategories();
      await this.getCuisine();
      await this.getRestaurants();
      this.hideLoading();
    }
  },
  mounted(){
    this.fetchData();
    // Alternatively we could also do that
    // and drop the fetchData function
    // Promise.all([
    //     this.getCategories(),
    //     this.getCuisine()
    // ])
    // .then((values)=>{
    //   this.categories = values[0];
    //   this.cuisines = values[1];
    //   this.pending = false;
    // })
    // .catch((error)=>{
    //   console.error(error)
    // })
  }
}
</script>

<style lang="scss">

@import "assets/scss/base";
@import "src/assets/scss/_variables.scss";

#app{
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.app__loading{
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  img{
    height: 50px;
    width: 50px;
    margin-bottom: 10px;
  }
  span{
    color: $fontColor;
  }
}

.RestaurantFinder{
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
}

</style>
