<template>
  <!-- Card -->
  <div class="RestaurantFinderCard" :class="isCardOpen ? 'RestaurantFinderCard--open' : ''">
    <div class="RestaurantFinderCard__back" @click="backToResults">Back to results</div>
    <!-- Card Image -->
    <div class="RestaurantFinderCard__image" :class="singleRestaurant.featured_image ? '' : 'RestaurantFinderCard__image--empty'">
      <img @load="displayImage" v-if="singleRestaurant.featured_image" :src="singleRestaurant.featured_image" :alt="singleRestaurant.name">
      <Loader v-if="!isImageLoaded && singleRestaurant.featured_image"></Loader>
    </div>
    <!-- Card Details -->
    <div class="RestaurantFinderCard__details">
      <h2 class="RestaurantFinderCard__title">{{singleRestaurant.name}}</h2>
      <p class="RestaurantFinderCard__address">
        <span v-if="singleRestaurant.location.address">{{ singleRestaurant.location.address }}</span>
      </p>
      <div class="RestaurantFinderCard__icons">
        <div :class="singleRestaurant.has_table_booking ? 'RestaurantFinderCard__icon RestaurantFinderCard__icon--check' : 'RestaurantFinderCard__icon RestaurantFinderCard__icon--cross'">
          <span v-if="singleRestaurant.has_table_booking">Booking available</span>
          <span v-else>No bookings</span>
        </div>
        <div :class="singleRestaurant.has_table_booking ? 'RestaurantFinderCard__icon RestaurantFinderCard__icon--check' : 'RestaurantFinderCard__icon RestaurantFinderCard__icon--cross'">
          <span v-if="singleRestaurant.has_online_delivery">Delivery available</span>
          <span v-else>No delivery</span>
        </div>
      </div>
      <div class="RestaurantFinderCard__elem" v-if="singleRestaurant.cuisines">
        <h4 class="RestaurantFinderCard__info-title">Cuisines</h4>
        <p class="RestaurantFinderCard__info"><span>{{ singleRestaurant.cuisines }}</span></p>
      </div>
      <div class="RestaurantFinderCard__elem" v-if="singleRestaurant.phone_numbers">
        <h4 class="RestaurantFinderCard__info-title">Phone Number</h4>
        <p class="RestaurantFinderCard__info"><span>{{ singleRestaurant.phone_numbers }}</span></p>
      </div>
      <div class="RestaurantFinderCard__elem" v-if="singleRestaurant.timings">
        <h4 class="RestaurantFinderCard__info-title">OPENING HOURS</h4>
        <p class="RestaurantFinderCard__info">
          <span :class="longText(singleRestaurant.timings) ? 'RestaurantFinderCard__info--small-text' : ''">{{ singleRestaurant.timings }}</span>
          <span class="btn-primary RestaurantFinderCard__btn RestaurantFinderCard__btn--success" v-if="singleRestaurant.is_delivering_now">open now</span>
          <span class="btn-primary RestaurantFinderCard__btn RestaurantFinderCard__btn--error" v-else>close now</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RestaurantFinderCard",
  props : {
    restaurant : Array,
    isOpen : String
  },
  data(){
    return {
      singleRestaurant : {},
      isImageLoaded : false,
      isCardOpen : false
    }
  },
  methods : {
    /*
    ** Check the size of the text
    ** Return true if more than 100 character
     */
    longText(text){
      if(text.length>100){
        return true
      }else{
        return false
      }
    },
    displayImage(){
        this.isImageLoaded = true;
    },
    hideImage(){
      this.isImageLoaded = false;
    },
    backToResults(){
      this.isCardOpen = false;
    }
  },
  created() {
    // Assign the value received from the parent to singleRestaurant to display the data
    this.singleRestaurant = this.restaurant[0].restaurant;
    this.isCardOpen = true
  },
  watch : {
    // Watch for any changes on restaurant prop, assign it to singleRestaurant to display the data
    restaurant(){
      this.hideImage();
      this.singleRestaurant = this.restaurant[0].restaurant;
    },
    isOpen(){
      this.isCardOpen = true
    }
  }
}
</script>

<style lang="scss" scoped>

.RestaurantFinderCard{
  padding:63px;
  display: flex;
  align-items: flex-start;
  @include respond_to(lg-down){
    padding: 2.5rem;
  }
  @include respond_to(md-down){
    flex-flow: column;
  }
  @include respond_to(xs-down) {
    padding-top: 75px;
    &--open{
      position: fixed;
      top: 0;
      z-index: 100;
      height: 100vh;
      width: 100%;
      overflow: hidden scroll;
      background-color: $greyBgCard;
    }
  }
}

.RestaurantFinderCard__back{
  display: none;
  @include respond_to(xs-down){
    display: flex;
    position: absolute;
    top: 20px;
    align-items: center;
    text-transform: uppercase;
    opacity: .7;
    font-weight: bold;
    &:before{
      content: '';
      display: block;
      height: 1.3rem;
      width: 1.3rem;
      margin-right: 10px;
      background-image: url('~@/assets/images/arrow-left-regular.svg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.RestaurantFinderCard__image{
  width: 38%;
  position: relative;
  overflow: hidden;
  background-color: $greyBgResults;
  margin-right: 4rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &--empty{
    background-image: url('~@/assets/images/image-polaroid-regular.svg');
    background-repeat: no-repeat;
    background-size: 40px;
    background-position: center;
  }
  @include respond_to(lg-down){
    margin-right: 2rem;
  }
  @include respond_to(md-down){
    width: 200px;
    margin-bottom: 25px;
  }
  &:before{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  img{
    height: 100%;
    width: auto;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .app__loading{
    background-color: $greyBgResults;
    height: 100%;
    width: 100%;
    position: absolute;
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
    background-position: center;
    background-repeat: no-repeat;
  }
  &--check{
    &:before{
      background-image: url('~@/assets/images/check-regular.svg');
    }
  }
  &--cross{
    &:before{
      background-image: url('~@/assets/images/times-regular.svg');
    }
  }
}

.RestaurantFinderCard__elem{
  margin-bottom: 1.5rem;
  &:last-child{
    margin-bottom: 0;
  }
  .RestaurantFinderCard__info-title{
    line-height: .9;
    color: $fontColor;
    @include respond_to(lg-down){
      font-size: .9rem;
    }
  }
  .RestaurantFinderCard__info{
    display: flex;
    align-items: flex-start;
    span:not(.RestaurantFinderCard__btn){
      font-size: 1.8rem;
      @include respond_to(lg-down){
        font-size: 1.4rem;
      }
      &.RestaurantFinderCard__info--small-text{
        font-size: 1.4em;
        @include respond_to(lg-down){
          font-size: 1.1rem;
        }
      }
    }
  }
  .RestaurantFinderCard__btn{
    margin-left: 10px;
    flex-shrink: 0;
    position: relative;
    top: 5px;
    &--success{
      background-color:$green;
    }
    &--error{
      background-color:$red;
    }
  }
}

</style>