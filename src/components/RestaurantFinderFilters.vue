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
          <VueRangeSlider v-model="filterData.rangeRating" :min="rangeRating.min" :max="rangeRating.max" @drag-end="filterByRange" :clickable="false"></VueRangeSlider>
          <div class="RestaurantFinderFilters__info-slider">
            <span>{{ rangeRating.min }}</span>
            <span>{{ rangeRating.max }}</span>
          </div>
        </div>
      </div>
      <div class="RestaurantFinderFilters__range">
        <h3 class="RestaurantFinderFilters__title">
          Cost
        </h3>
        <div class="RestaurantFinderFilters__slider">
          <VueRangeSlider v-model="filterData.rangeCost" :min="rangeCost.min" :max="rangeCost.max" @drag-end="filterByRange" :clickable="false"></VueRangeSlider>
          <div class="RestaurantFinderFilters__info-slider">
            <span>$</span>
            <span>$$$$</span>
          </div>
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
        rangeCost : [1,4]
      },
      rangeRating : {
        min : 0,
        max : 5
      },
      rangeCost : {
        min : 1,
        max : 4
      }
    }
  },
  created() {
    //set the filter
  },
  methods : {
    filterRestaurant(){
      // Change the status of the store
      this.$store.dispatch('updateStatus','pending');
      // Build the parameters object to pass to the dispatch
      let params = this.buildParams();
      this.$store.dispatch('getRestaurants',params)
          .then(()=>{

          })
          .catch((e)=>{
            console.error(e)
          })
    },
    buildParams(){
      return {
        cuisines : this.filterData.cuisine.join(','),
        category : this.filterData.categories.join(','),
        rating : this.filterData.rangeRating,
      }
    },
    filterByRange(){
      this.$store.dispatch('updateStatus','pending');
      this.$store.dispatch('updateFilter',{rating : this.filterData.rangeRating,cost : this.filterData.rangeCost});
    }
  }
}
</script>

<style lang="scss" scoped>

.RestaurantFinderFilters{
  padding: 20px $spacingContainer 20px;
  background-color: white;
  display: flex;
  align-items: center;
  height: $heightFilter;
  overflow: hidden;
  @include respond_to(md-down){
    flex-wrap: wrap;
    justify-content: space-between;
    height: auto;
  }
}

.RestaurantFinderFilters__col{
  margin-right:7%;
  &--middle{
    @include respond_to(md-down){
      margin-right: 0;
    }
    @include respond_to(xs-down) {
      margin-top: 1rem;
    }
  }
  &--right{
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    justify-content: space-between;
    margin-right: 0;
    flex-grow: 1;
    @include respond_to(md-down){
      width: 100%;
      margin-top: 25px;
      align-items: flex-start;
      flex-flow: row;
    }
    @include respond_to(md-down){
      flex-flow: column;
    }
  }
}

.RestaurantFinderFilters__title{
  margin-bottom: 1rem;
}

.RestaurantFinderFilters__choices{
  &--grid{
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    column-gap: 6rem;
    row-gap: 0;
    align-items: flex-start;
    @include respond_to(lg-down){
      column-gap : 3rem !important;
    }
  }
  @include respond_to(xs-down){
    grid-template-columns: 120px auto;
    grid-template-rows: auto auto;
    column-gap: 3rem;
    display: grid;
    row-gap: 0;
    align-items: flex-start;
  }
}

.RestaurantFinderFilters__range{
  max-width: 500px;
  width: 25vw;
  min-width: 200px;
  @include respond_to(md-down){
    width: 40%;
  }
  @include respond_to(xs-down){
    margin-bottom: 1rem;
    width: 100%;
  }
  &:last-child{
    margin-bottom: 0;
    position: relative;
    top: 1rem;
    @include respond_to(md-down){
      top: 0;
    }
  }
  .RestaurantFinderFilters__title{
    margin-bottom: .5rem;
    @include respond_to(md-down){
      margin-bottom: 0;
    }
  }
}

.RestaurantFinderFilters__info-slider{
  display: flex;
  justify-content: space-between;
  margin-top: -5px;
}

</style>