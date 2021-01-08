<template>
  <div id="app" >
    <div v-if="pending">Loading...</div>
    <div class="RestaurantFinder" v-else>
      <div class="RestaurantFinder__filters">
        <RestaurantFinderFilters :categories="categories"></RestaurantFinderFilters>
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
      categories : null
    }
  },
  methods : {
    getCategories(){
      axios.get('/categories')
      .then(response => {
        this.categories = response.data.categories;
      })
      .catch(e => {
        console.error(e);
      })
    }
  },
  async mounted(){
    await this.getCategories();
    this.pending = false
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
