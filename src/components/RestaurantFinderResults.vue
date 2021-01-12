<template>
  <!-- Results -->
  <div class="RestaurantFinder__results">
    <div class="RestaurantFinder__results-container">
      <div class="RestaurantFinderResults" ref="RestaurantFinderResults">
        <h3 class="RestaurantFinderResults__title">Results</h3>
        <ul class="RestaurantFinderResults__list" v-if="filteredRestaurants.length>0">
          <li
              class="RestaurantFinderResults__item"
              :class="isActive===restaurant.restaurant.id ? 'RestaurantFinderResults__item--active' : ''"
              role="button" v-for="restaurant in filteredRestaurants"
              :key="restaurant.restaurant.id"
              @click="isActive!==restaurant.restaurant.id ? getRestaurantCard(restaurant.restaurant.id) : ''"
          >
            {{restaurant.restaurant.name}}
          </li>
        </ul>
        <p class="RestaurantFinderResults__empty" v-else>No results, please change your search</p>
        <Loader v-if="status==='pending'" :class="'RestaurantFinderResults__loader'" :text="waitingText"></Loader>
      </div>
    </div>
    <div class="RestaurantFinder__card">
      <RestaurantFinderCard v-if="status==='success' && singleRestaurantData" :restaurant="singleRestaurantData"></RestaurantFinderCard>
      <div class="RestaurantFinder__no-card" v-else>
        <span v-if="status==='success' && filteredRestaurants.length>0">Select a restaurant to see more</span>
      </div>
    </div>
  </div>
</template>

<script>

import RestaurantFinderCard from "@/components/RestaurantFinderCard";
import {mapGetters} from 'vuex';

export default {
  name: "RestaurantFinderResults",
  components : {
    RestaurantFinderCard
  },
  props : {
    waitingText : {
      type : String
    }
  },
  data () {
    return {
      pending : true,
      singleRestaurantData : null,
      resultsRestaurant : null,
      isActive : null
    }
  },
  computed : {
    ...mapGetters({
      'status' : 'getStatus',
      'filteredRestaurants' : 'getFilteredRestaurants'
    })
  },
  methods : {
    /*
    ** Get the data of the restaurant with the restaurant ID
    ** in the store calling a getter
     */
    getRestaurantCard(restaurantID){
      this.isActive = restaurantID;
      this.singleRestaurantData = this.$store.getters.singleRestaurant(restaurantID);
    }
  },
  watch : {
    filteredRestaurants(){
      this.singleRestaurantData = null;
      this.isActive = null;
    },
    status(){
      this.$refs.RestaurantFinderResults.scrollTop = 0;
    }
  }
}
</script>

<style lang="scss" scoped>

.RestaurantFinder__results{
  height: calc(100vh - #{$heightFilter});
  display: flex;
  position: relative;
  @include respond_to(md-down){
    height: auto;
    background-color: $greyBgResults;
  }
}

.RestaurantFinder__results-container{
  width: 28%;
  min-width:400px;
  height: 100%;
  position: relative;
  background-color: $greyBgResults;
  padding: 10px 0;
  flex-shrink: 0;
  @include respond_to(sm-down){
    width: 100%;
    height: auto;
  }
}

.RestaurantFinderResults{
  height: 100%;
  width: calc(100% - 10px);
  overflow:hidden scroll;
  padding-top: 53px;
  flex-shrink: 0;

  @include respond_to(lg){
    // Width
    &::-webkit-scrollbar {
      width: 10px;
      margin: 5px;
    }
    // Track
    &::-webkit-scrollbar-track {
      background-color: #D5D5D5;
      border-radius: 10px;
    }
    // Handle
    &::-webkit-scrollbar-thumb {
      background: #B2B6B7;
      border-radius: 10px;
    }
    // Handle on hover
    &::-webkit-scrollbar-thumb:hover {
      background: #a5a8a9;
    }
  }
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
  height: calc(100vh - 250px);
  overflow: hidden scroll;
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
  @include respond_to(sm-down){
    align-items: flex-start;
  }
  span{
    opacity: .3;
    display: inline-flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    @include respond_to(sm-down){
      text-align: center;
    }
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
  padding: 15px $spacingContainer 15px;
  position: absolute;
  height: 53px;
  background: $greyBgResults;
  top: 10px;
  width: calc(100% - 20px);
}

.RestaurantFinderResults__list{
  list-style: none;
}

.RestaurantFinderResults__item{
  display: inline-block;
  width: calc(100% - 10px);
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