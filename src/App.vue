<template>
  <div id="app" >
    <RestaurantFinder></RestaurantFinder>
  </div>
</template>

<script>
import RestaurantFinder from "@/components/RestaurantFinder";

export default {
  name: 'App',
  components: {
    RestaurantFinder
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
</style>
