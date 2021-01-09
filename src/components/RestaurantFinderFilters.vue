<template>
  <div class="RestaurantFinderFilters">
    <div class="RestaurantFinderFilters__col RestaurantFinderFilters__col--left">
      <h3 class="RestaurantFinderFilters__title">
        Category
      </h3>
      <div class="RestaurantFinderFilters__choices">
        <div class="RestaurantFinderFilters__item group-checkbox" v-for="category in categories" :key="category.categories.id">
          <input type="checkbox" :id="'category-'+category.categories.id" :value="category.categories.id" v-model="filterData.categories" @change="filterRestaurant">
          <label :for="'category-'+category.categories.id">{{category.categories.name}}</label>
        </div>
      </div>
    </div>
    <div class="RestaurantFinderFilters__col RestaurantFinderFilters__col--middle">
      <h3 class="RestaurantFinderFilters__title">
        Cuisine
      </h3>
      <div class="RestaurantFinderFilters__choices RestaurantFinderFilters__choices--grid">
        <div class="RestaurantFinderFilters__item group-checkbox" v-for="cuisine in cuisines" :key="cuisine.cuisine.cuisine_id">
          <input type="checkbox" :id="'cuisine-'+cuisine.cuisine.cuisine_id" :value="cuisine.cuisine.cuisine_id" v-model="filterData.cuisine" @change="filterRestaurant">
          <label :for="'cuisine-'+cuisine.cuisine.cuisine_id">{{cuisine.cuisine.cuisine_name}}</label>
        </div>
      </div>
    </div>
    <div class="RestaurantFinderFilters__col RestaurantFinderFilters__col--right">
      <div class="RestaurantFinderFilters__range">
        <h3 class="RestaurantFinderFilters__title">
          Rating
        </h3>
        <div class="RestaurantFinderFilters__slider">
          <VueRangeSlider v-model="filterData.rangeRating" :min="rangeRating.min" :max="rangeRating.max" @drag-end="filterRestaurant"></VueRangeSlider>
        </div>
      </div>
      <div class="RestaurantFinderFilters__range">
        <h3 class="RestaurantFinderFilters__title">
          Cost
        </h3>
        <div class="RestaurantFinderFilters__slider">
          <VueRangeSlider v-model="filterData.rangeCost" :min="rangeCost.min" :max="rangeCost.max" @drag-end="filterRestaurant"></VueRangeSlider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'

export default {
  name: "RestaurantFinderFilters",
  components : {
    VueRangeSlider
  },
  props : {
    categories : {
      type : Array,
      required : true
    },
    cuisines : {
      type : Array,
      required : true
    }
  },
  data () {
    return {
      filterData : {
        categories : [],
        cuisine : [],
        rangeRating :  [0,5],
        rangeCost : [0,4]
      },
      rangeRating : {
        min : 0,
        max : 5
      },
      rangeCost : {
        min : 0,
        max : 4
      }
    }
  },
  methods : {
    filterRestaurant(){
      let params = this.buildParams();
      return this.$store.dispatch('getRestaurants',params)
          .catch((e)=>{
            console.error(e)
          })
    },
    buildParams(){
      return {
        cuisines : this.filterData.cuisine.join(','),
        category : this.filterData.categories.join(','),
        rating : this.filterData.rangeRating
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import "src/assets/scss/variables";

.RestaurantFinderFilters{
  padding: 50px $spacingContainer 50px;
  background-color: white;
  display: flex;
  height: $heightFilter;
  overflow: hidden;
}

.RestaurantFinderFilters__col{
  margin-right:7%;
  &--right{
    display: flex;
    flex-flow: column;
    align-items: flex-end;
  }
  &:last-child{
    margin-right: 0;
    flex-grow: 1;
  }
}

.RestaurantFinderFilters__title{
  margin-bottom: 1.25rem;
}

.RestaurantFinderFilters__choices{
  &--grid{
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    column-gap: 6rem;
    row-gap: 0;
    align-items: flex-start;
  }
}

.RestaurantFinderFilters__range{
  margin-bottom: 2rem;
  max-width: 500px;
  width: 25vw;
  min-width: 200px;
  &:last-child{
    margin-bottom: 0;
  }
}

</style>