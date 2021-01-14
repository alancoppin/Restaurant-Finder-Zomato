<template>
  <div id="app" >
    <div class="RestaurantFinder">
      <div class="RestaurantFinder__filters">
        <RestaurantFinderFilters :categories="categories" :cuisines="cuisines"></RestaurantFinderFilters>
      </div>
      <div class="RestaurantFinder__grip">
        <RestaurantFinderResults :waitingText="waitingText" v-if="hasLocation"></RestaurantFinderResults>
        <div class="RestaurantFinder__no-geolocation" v-else>
          <p>This app required the geolocation. Please allow in your browser settings.</p>
        </div>
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
      hasLocation : true,
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
    getRestaurants(){
      this.$store.dispatch('getRestaurants');
    },
    async getGeolocation(){
      try {
        const coordinates = await this.$getLocation();
        this.hasLocation = true;
        this.$store.dispatch('getCity', {lat: coordinates.lat, lon: coordinates.lng});
      }catch(e){
        console.error(e);
        this.hasLocation = false;
      }
    }
  },
  mounted(){
    // Get the geolocation
    this.getGeolocation();
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

.RestaurantFinder__no-geolocation{
  padding: 50px $spacingContainer;
  font-weight: bold;
}

</style>
