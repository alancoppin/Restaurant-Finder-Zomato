<template>
  <div class="RestaurantFinderResults">
      <h3 class="RestaurantFinderResults__title">Results</h3>
      <ul class="RestaurantFinderResults__list">
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item RestaurantFinderResults__item--active">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
        <li class="RestaurantFinderResults__item">Bread & Bone Wood Grill</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "RestaurantFinderResults"
}
</script>

<style lang="scss" scoped>

@import "src/assets/scss/variables";

.RestaurantFinderResults{
  max-height: 100%;
  width: 100%;
  overflow:scroll;
  padding-top: 68px;
  margin-bottom: 40px;
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
  &:first-child{
    border-top:1px solid #b2b6b7;
  }
  &--active{
    background-color: $cyan;
    color: white;
  }
}

</style>