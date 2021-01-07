<template>
  <div class="RestaurantFinderCard">
    <div class="RestaurantFinderCard__image">
      <img src="" alt="">
    </div>
    <div class="RestaurantFinderCard__details">
      <h2 class="RestaurantFinderCard__title">Handsome and the Duchess</h2>
      <p class="RestaurantFinderCard__address">16 McHenry Street, Adelaide, City Centre, Adelaide, SA</p>
      <div class="RestaurantFinderCard__icons">
        <div class="RestaurantFinderCard__icon RestaurantFinderCard__icon--cross">
          No bookings
        </div>
        <div class="RestaurantFinderCard__icon RestaurantFinderCard__icon--check">
          Delivery available
        </div>
      </div>
      <div class="RestaurantFinderCard__elem">
        <h4 class="RestaurantFinderCard__info-title">Cuisines</h4>
        <p class="RestaurantFinderCard__info"><span>Coffee and Tea, Cafe Food</span></p>
      </div>
      <div class="RestaurantFinderCard__elem">
        <h4 class="RestaurantFinderCard__info-title">Phone Number</h4>
        <p class="RestaurantFinderCard__info"><span>0425 729 534</span></p>
      </div>
      <div class="RestaurantFinderCard__elem">
        <h4 class="RestaurantFinderCard__info-title">OPENING HOURS</h4>
        <p class="RestaurantFinderCard__info"><span>Today 6:30AM to 4PM</span> <span class="btn-primary RestaurantFinderCard__btn RestaurantFinderCard__btn--success">open now</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantFinderCard"
}
</script>

<style lang="scss" scoped>

@import "src/assets/scss/variables";

.RestaurantFinderCard{
  padding:5rem;
  display: flex;
}

.RestaurantFinderCard__image{
  width: 38%;
  position: relative;
  overflow: hidden;
  background-color: red;
  margin-right: 4rem;
  &:before{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  img{
    width: 100%;
  }
}

.RestaurantFinderCard__details{
  color: $blueGrey;
}

.RestaurantFinderCard__title{
  line-height: 1;
}

.RestaurantFinderCard__address{
  color: $blueGreyLight;
  font-size: 1.3rem;
}

.RestaurantFinderCard__icons{
  margin: 2rem 0;
}

.RestaurantFinderCard__icon{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 1.3rem;
  &:last-child{
    margin-bottom: 0;
  }
  &:before{
    content: '';
    height: 1.3rem;
    width: 1.3rem;
    margin-right: .5rem;
    display: inline-block;
    background-color: red;
  }
}

.RestaurantFinderCard__elem{
  margin-bottom: 1.3rem;
  &:last-child{
    margin-bottom: 0;
  }
  .RestaurantFinderCard__info-title{
    line-height: .9;
  }
  .RestaurantFinderCard__info{
    display: flex;
    align-items: center;
    span:not(.RestaurantFinderCard__btn){
      font-size: 1.8rem;
    }
  }
  .RestaurantFinderCard__btn{
    margin-left: 10px;
  }
}

</style>