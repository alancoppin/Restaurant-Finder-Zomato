<template>
  <!-- Results -->
  <div class="RestaurantFinder__results">
    <div class="RestaurantFinderResults" ref="RestaurantFinderResults">
      <h3 class="RestaurantFinderResults__title">Results</h3>
      <ul class="RestaurantFinderResults__list" v-if="restaurants.length>0">
        <li class="RestaurantFinderResults__item" :class="isActive===restaurant.restaurant.id ? 'RestaurantFinderResults__item--active' : ''" role="button" v-for="restaurant in restaurants" :key="restaurant.restaurant.id" v-on:click="getRestaurantCard(restaurant.restaurant.id)">
          {{restaurant.restaurant.name}}
        </li>
      </ul>
      <p class="RestaurantFinderResults__empty" v-else>No results, please change your search</p>
      <Loader v-if="status==='pending'" :class="'RestaurantFinderResults__loader'" :text="'Getting restaurants'"></Loader>
    </div>
    <div class="RestaurantFinder__card">
      <RestaurantFinderCard v-if="status==='success' && singleRestaurantData" :restaurant="singleRestaurantData"></RestaurantFinderCard>
      <div class="RestaurantFinder__no-card" v-else>
        <span v-if="status==='success'">Select a restaurant to see more</span>
      </div>
    </div>
  </div>
</template>

<script>

import RestaurantFinderCard from "@/components/RestaurantFinderCard";
import {mapState} from 'vuex';

export default {
  name: "RestaurantFinderResults",
  components : {
    RestaurantFinderCard
  },
  props : {

  },
  data () {
    return {
      pending : true,
      singleRestaurantData : null,
      resultsRestaurant : null,
      isActive : null
    }
  },
  computed : mapState(['restaurants','status']),
  methods : {
    /*
    ** Get the data of the restaurant with the restaurant ID
    ** in the store calling a getter
     */
    getRestaurantCard(restaurantID){
      this.isActive = restaurantID;
      this.singleRestaurantData = this.$store.getters.singleRestaurant(restaurantID);
    },
  },
  watch : {
    restaurants(){
      this.singleRestaurantData = null;
    },
    status(){
      this.$refs.RestaurantFinderResults.scrollTop = 0;
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
  flex-shrink: 0;
}

.app__loading.RestaurantFinderResults__loader{
  position: absolute;
  background-color: $greyBgResults;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
}

.RestaurantFinderResults__empty{
  padding: 20px $spacingContainer;
}

.RestaurantFinder__card{
  flex-grow: 1;
  background-color: $greyBgCard;
}

.RestaurantFinder__no-card{
  height: 100%;
  width: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: bold;
  text-transform: uppercase;
  span{
    opacity: .3;
    display: inline-flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    &:before{
      content: '';
      margin-bottom: 10px;
      height: 3rem;
      width: 3rem;
      display: block;
      background-image: url('~@/assets/images/arrow-left-regular.svg');
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
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
  &--active,&:hover{
    background-color: $cyan;
    color: white;
  }
}

</style>