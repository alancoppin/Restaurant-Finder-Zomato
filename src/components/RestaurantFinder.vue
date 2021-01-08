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