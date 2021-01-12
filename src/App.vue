<template>
  <div id="app" >
    <div class="RestaurantFinder">
      <div class="RestaurantFinder__filters">
        <RestaurantFinderFilters :categories="categories" :cuisines="cuisines"></RestaurantFinderFilters>
      </div>
      <div class="RestaurantFinder__grip">
        <RestaurantFinderResults :waitingText="waitingText"></RestaurantFinderResults>
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantFinderFilters from "@/components/RestaurantFinderFilters";
import RestaurantFinderResults from "@/components/RestaurantFinderResults";

export default {
  name: 'App',
  components: {
    RestaurantFinderFilters,
    RestaurantFinderResults,
  },
  data () {
    return {
      waitingText : 'Getting location...',
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
    // Get restaurants data through the store
    async getRestaurants(){
      await this.$store.dispatch('getRestaurants');
    },
  },
  async mounted(){
    // Get the geolocation
    const coordinates = await this.$getLocation();
    await this.$store.dispatch('getCity',{lat:coordinates.lat,lon:coordinates.lng});
    this.waitingText = 'Getting restaurants...'
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
