<template>
  <div class="app__loading">
    <img :src="require('@/assets/images/three-dots.svg')" alt="Loading">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "RestaurantFinderLoader",
  props : {
    text : {
      type : String,
    },
  },
}
</script>

<style lang="scss" scoped>

.app__loading{
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  img{
    height: 50px;
    width: 50px;
    margin-bottom: 10px;
  }
  span{
    color: $fontColor;
  }
}
</style>