<template>
  <div class="RestaurantFinder">
    <div class="RestaurantFinder__filters">
      <RestaurantFinderFilters></RestaurantFinderFilters>
    </div>
    <div class="RestaurantFinder__grip">
      <div class="RestaurantFinder__results">
        <RestaurantFinderResults></RestaurantFinderResults>
      </div>
      <div class="RestaurantFinder__card">
        <RestaurantFinderCard></RestaurantFinderCard>
      </div>
    </div>
  </div>
</template>

<script>

import RestaurantFinderFilters from "@/components/RestaurantFinderFilters";
import RestaurantFinderResults from "@/components/RestaurantFinderResults";
import RestaurantFinderCard from "@/components/RestaurantFinderCard";


export default {
  name: "RestaurantFinder",
  components : {
    RestaurantFinderFilters,
    RestaurantFinderResults,
    RestaurantFinderCard
  },
  computed: {
    posts() {
      console.log(this.$store.state.restaurants);
      return this.$store.state.restaurants
    }
  },
  mounted() {
    this.$store.dispatch("getRestaurants");
  }
}
</script>

<style lang="scss" scoped>


</style>