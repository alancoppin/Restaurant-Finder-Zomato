<template>
  <div class="RestaurantFinder__results">
    <div class="RestaurantFinderResults">
      <h3 class="RestaurantFinderResults__title">Results</h3>
      <ul class="RestaurantFinderResults__list" v-if="restaurants">
        <li class="RestaurantFinderResults__item" role="button" v-for="restaurant in restaurants" :key="restaurant.restaurant.id" v-on:click="getRestaurantCard(restaurant.restaurant.id)">
          {{restaurant.restaurant.name}}
        </li>
      </ul>
      <p v-else>No results, please change your search</p>
    </div>
    <div class="RestaurantFinder__card">
      <RestaurantFinderCard v-if="restaurant" :restaurant="restaurant"></RestaurantFinderCard>
      <p v-else>please select a restaurant on the left column</p>
    </div>
  </div>
</template>

<script>

import RestaurantFinderCard from "@/components/RestaurantFinderCard";

export default {
  name: "RestaurantFinderResults",
  components : {
    RestaurantFinderCard
  },
  props : {
    restaurants : {
      type : Array
    }
  },
  data () {
    return {
      pending : true,
      restaurant : null
    }
  },
  methods : {
    getRestaurantCard(restaurantID){
      this.restaurant = this.$store.getters.singleRestaurant(restaurantID);
    }
  }
}
</script>

<style lang="scss" scoped>

@import "src/assets/scss/variables";

.RestaurantFinder__results{
  height: calc(100vh - #{$heightFilter});
  display: flex;
  position: relative;
}

.RestaurantFinderResults{
  width: 28%;
  min-width:400px;
  background-color: $greyBgResults;
  height: 100%;
  position: relative;
  overflow:scroll;
  padding-top: 68px;
  margin-bottom: 40px;
}

.RestaurantFinder__card{
  flex-grow: 1;
  background-color: $greyBgCard;
}

.RestaurantFinderResults__title{
  position: absolute;
  width: 95%;
  top: 0;
  background-color: $greyBgResults;
  padding: 30px $spacingContainer 15px;
  height: 68px;
}

.RestaurantFinderResults__list{
  list-style: none;
}

.RestaurantFinderResults__item{
  display: inline-block;
  width: 95%;
  padding:15px 50px 15px $spacingContainer;
  border-bottom:1px solid #b2b6b7;
  color: $blueGrey;
  font-size: 1.3rem;
  transition : background-color .3s ease, color .3s ease;
  cursor: pointer;
  &:first-child{
    border-top:1px solid #b2b6b7;
  }
  &--active{
    background-color: $cyan;
    color: white;
  }
}

</style>