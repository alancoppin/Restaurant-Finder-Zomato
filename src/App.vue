<template>
  <div id="app" >
    <div v-if="pending">Loading...</div>
    <div class="RestaurantFinder" v-else>
      <div class="RestaurantFinder__filters">
        <RestaurantFinderFilters :categories="categories" :cuisines="cuisines"></RestaurantFinderFilters>
      </div>
      <div class="RestaurantFinder__grip">
        <div class="RestaurantFinder__results">
          <RestaurantFinderResults :restaurants="restaurants"></RestaurantFinderResults>
        </div>
        <div class="RestaurantFinder__card">
          <RestaurantFinderCard></RestaurantFinderCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantFinderFilters from "@/components/RestaurantFinderFilters";
import RestaurantFinderResults from "@/components/RestaurantFinderResults";
import RestaurantFinderCard from "@/components/RestaurantFinderCard";

import axios from "axios";

export default {
  name: 'App',
  components: {
    RestaurantFinderFilters,
    RestaurantFinderResults,
    RestaurantFinderCard
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
    getCategories(){
      return axios.get('/categories')
          .then(response => {
            this.categories = response.data.categories
          })
          .catch(e => {
            console.error(e);
          })

    },
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
    getRestaurants(){
      return this.$store.dispatch('getRestaurants')
          .then(()=> {
            this.restaurants = this.$store.getters.allRestaurants;
          })
          .catch((e)=>{
            console.error(e)
          })
    },
    async fetchData(){
      await this.getCategories();
      await this.getCuisine();
      await this.getRestaurants();
      this.pending = false;
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

#app{
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

@import "src/assets/scss/_variables.scss";

.RestaurantFinder{
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
}

.RestaurantFinder__grip{
  height: calc(100vh - #{$heightFilter});
  display: flex;
  position: relative;
}

.RestaurantFinder__results{
  width: 28%;
  min-width:400px;
  background-color: $greyBgResults;
  height: 100%;
  position: relative;
}

.RestaurantFinder__card{
  flex-grow: 1;
  background-color: $greyBgCard;
}


</style>
