<template>
  <div id="app" >
    <Loader v-if="pending" :text="'Getting restaurants'"></Loader>
    <div class="RestaurantFinder" v-else>
      <div class="RestaurantFinder__filters">
        <RestaurantFinderFilters :categories="categories" :cuisines="cuisines"></RestaurantFinderFilters>
      </div>
      <div class="RestaurantFinder__grip">
        <RestaurantFinderResults></RestaurantFinderResults>
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
      // Use to display the categories by ID
      targetedCategories : [1,2,5,11],
      targetedCuisines : [30,161,82,40,3,5,55,304,25,983,110],
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
            this.categories = response.data.categories.filter(item=>this.targetedCategories.includes(item.categories.id))
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
            this.cuisines = response.data.cuisines.filter(item=>this.targetedCuisines.includes(item.cuisine.cuisine_id));
          })
          .catch(e => {
            console.error(e);
          })

    },
    /*
    ** Get restaurants data through the store
     */
    async getRestaurants(){
      // try{
      //   await this.$store.dispatch('getRestaurants')
      //   console.log('await done');
      // }
      // catch(e){
      //   console.error(e)
      // }
      return this.$store.dispatch('getRestaurants')
          .catch((e)=>{
            console.error(e)
          })
    },
    /*
    **
     */
    // Fetch all the data and hide the loading once the data are fetch
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
@import "src/assets/scss/_variables.scss";

#app{
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.RestaurantFinder{
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
}

</style>
