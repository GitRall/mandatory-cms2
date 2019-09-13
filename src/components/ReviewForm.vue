<template lang="html">
  <form class="review-form-wrapper" @submit.prevent="sendReview()">
    <label class="review-form-label">Title</label>
    <input class="review-form-input" type="text" v-model="title" required>
    <label class="review-form-label">Content</label>
    <textarea class="review-form-textarea" rows="8" cols="80" v-model="content" required></textarea>
    <star-rating
    v-model="rating"
    :show-rating="false"
    :star-size="40"
    active-color="#FDD835"
    inactive-color="rgba(195, 200, 201, 0.3)"
    :border-width="0"
    :glow="2"
    >
    </star-rating>
    <button class="review-submit-btn" type="submit" name="button">Send review</button>
  </form>
</template>

<script>
import StarRating from 'vue-star-rating';
import axios from 'axios';
import {cockpitToken, cockpitRootUrl} from '../constants';

export default {
  components: {
    StarRating
  },
  props: {
    product: Object
  },
  data(){
    return {
      title: '',
      content: '',
      rating: null
    }
  },
  methods: {
    sendReview(){
      let newReview = {
        value: {
          title: this.title,
          body: this.content,
          rating: this.rating
        }
      }
      let newReviews = [];
      newReviews.push(newReview);
      if(this.product.reviews){
        this.product.reviews.forEach((item) => {
          newReviews.push(item);
        })
      }
      axios.post(`${cockpitRootUrl}api/collections/save/products?token=${cockpitToken}`, {
        data: {
          _id: this.product._id,
          reviews: newReviews
        }
      })
      .then(() => {
        this.product.reviews = newReviews;
        this.title = '';
        this.content = '';
        this.rating = null;
      })
    }
  }
}
</script>

<style lang="css" scoped>

.review-form-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 80px;
  padding: 30px;
  box-sizing: border-box;
}
.review-form-label{
  font-size: 2.4rem;
  color: #86c232;
  margin-bottom: 4px;
}
.review-form-input{
  width: 100%;
  font-size: 3rem;
  padding: 15px 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #c3c8c9;
  box-sizing: border-box;
  margin-bottom: 30px;
}
.review-form-textarea{
  width: 100%;
  font-size: 2rem;
  padding: 15px 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #c3c8c9;
  box-sizing: border-box;
  resize: none;
  margin-bottom: 30px;
}
.review-submit-btn{
  align-self: flex-end;
  font-size: 2.4rem;
  border: none;
  padding: 15px 20px;
  background: rgba(97, 137, 47, 1);
  color: #e9f0e2;
  cursor: pointer;
}
.review-submit-btn:hover{
  background: rgba(97, 137, 47, 0.8);
}
</style>
