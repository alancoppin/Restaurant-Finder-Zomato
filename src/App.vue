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
      pending : false,
      // Use to display the categories by ID
      categories : [
        {
          "categories": {
            "id": 2,
            "name": "Dine-out"
          }
        },
        {
          "categories": {
            "id": 5,
            "name": "Takeaway"
          }
        },
        {
          "categories": {
            "id": 1,
            "name": "Delivery"
          }
        },
        {
          "categories": {
            "id": 11,
            "name": "Pubs & Bars"
          }
        }
      ],
      cuisines : [
        {
          "cuisine": {
            "cuisine_id": 1039,
            "cuisine_name": "Cafe Food"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 3,
            "cuisine_name": "Asian"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 25,
            "cuisine_name": "Chinese"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 161,
            "cuisine_name": "Coffee and Tea"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 5,
            "cuisine_name": "Bakery"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 983,
            "cuisine_name": "Pub Food"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 82,
            "cuisine_name": "Pizza"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 55,
            "cuisine_name": "Italian"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 110,
            "cuisine_name": "Others"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 40,
            "cuisine_name": "Fast Food"
          }
        },
        {
          "cuisine": {
            "cuisine_id": 304,
            "cuisine_name": "Sandwich"
          }
        }
      ],
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
      this.getRestaurants();
      this.pending = false;
    },
  },
  mounted(){
    // NOT USED
    /*
    ** Populate the data from the API, categories, cuisines and restaurants
     */
    // this.fetchData();
    this.getRestaurants();
  }
}
</script>

<style lang="scss">

@import "~@/assets/scss/base";

#app{
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  @include respond_to(md-down){
    height: auto;
  }
}

.RestaurantFinder{
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
}

</style>
