<template lang="html">
  <div class="reviews-container">
    <app-review-form :product="product"></app-review-form>
    <div class="review-wrapper" v-for="review in product.reviews">
      <h3 class="review-title">{{ review.value.title }}</h3>
      <p class="review-body">{{ review.value.body }}</p>
      <span class="review-rating" v-html="starRating(review.value.rating)" v-if="review.value.rating"></span>
    </div>
  </div>
</template>

<script>
import ReviewForm from './ReviewForm.vue';

export default {
  components: {
    appReviewForm: ReviewForm
  },
  props: {
    product: Object
  },
  methods:{
    starRating(n){
      let stars = '';
      for(let i = 0; i < 5; i++){
        if(i < n){
          stars += '<i class="material-icons star-icon">star</i>';
        }
        else{
          stars += '<i class="material-icons star-icon-grey">star</i>';
        }
      }
      return stars;
    }
  }
}
</script>

<style lang="css" scoped>
.reviews-container{
  width: 100%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  background: rgb(60,67,73);
  background: linear-gradient(32deg, rgba(60,67,73,1) 23%, rgba(102,109,115,1) 100%);
  box-sizing: border-box;
  margin-bottom: 30px;
  padding: 30px 50px;
}
.review-wrapper{
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 30px;
  padding: 30px;
  box-sizing: border-box;
}
.review-title{
  font-size: 2.4rem;
  color: #86c232;
  margin: 0 0 10px 0;
}
.review-body{
  font-size: 2rem;
  margin: 0;
  color: #c3c8c9;
}
</style>
<style>
.star-icon{
  margin-top: 30px;
  color: #FDD835;
}
.star-icon-grey{
  margin-top: 30px;
  color: #c3c8c9;
  opacity: 0.3;
}
</style>
