<template>
  <div class="RestaurantFinderFilters">
    <div class="RestaurantFinderFilters__col RestaurantFinderFilters__col--left">
      <h3 class="RestaurantFinderFilters__title">
        Category
      </h3>
      <div class="RestaurantFinderFilters__choices">
        <div class="RestaurantFinderFilters__item">
          <input type="checkbox" id="test" value="Test">
          <label for="test">Test</label>
        </div>
      </div>
    </div>
    <div class="RestaurantFinderFilters__col RestaurantFinderFilters__col--middle">
      <h3 class="RestaurantFinderFilters__title">
        Cuisine
      </h3>
      <div class="RestaurantFinderFilters__choices">
        <div class="RestaurantFinderFilters__item">
          <input type="checkbox" id="test" value="Test">
          <label for="test">Test</label>
        </div>
      </div>
    </div>
    <div class="RestaurantFinderFilters__col RestaurantFinderFilters__col--right">
      <div class="RestaurantFinderFilters--range">
        <h3 class="RestaurantFinderFilters__title">
          Rating
        </h3>
      </div>
      <div class="RestaurantFinderFilters--range">
        <h3 class="RestaurantFinderFilters__title">
          Cost
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "RestaurantFinderFilters"
}
</script>

<style lang="scss" scoped>

@import "src/assets/scss/variables";

.RestaurantFinderFilters{
  padding: 70px $spacingContainer 0;
  background-color: white;
  display: flex;
  height: $heightFilter;
}

.RestaurantFinderFilters__col{
  margin-right:7%;
  &--middle{
    flex-grow: 1;
  }
  &:last-child{
    margin-right: 0;
  }
}

.RestaurantFinderFilters__title{
  margin-bottom: 1.25rem;
}

.RestaurantFinderFilters--range{
  margin-bottom: 2.5rem;
  &:last-child{
    margin-bottom: 0;
  }
}

</style>