<template lang="html">
  <div class="product-container">
    <div class="product-wrapper">
      <div class="upper-field">
        <h4 class="product-title">{{product.name}}</h4>
      </div>
      <div class="content-field">
        <p class="product-description">{{ product.description }}</p>
      </div>
      <div class="lower-field">
        <div class="stock">
          {{ stockAmount }}
        </div>
        <div class="purchase-wrapper">
          <div class="quantity-wrapper">
            <input class="product-quantity" disabled type="number" min="1" :max="product.stock" v-model="quantity">
            <div class="quantity-actions-wrapper">
              <button class="quantity-action" @click="incrementQuantity()" :disabled="product.stock <= 0"><i class="material-icons">arrow_drop_up</i></button>
              <button class="quantity-action" @click="decrementQuantity()" :disabled="product.stock <= 0"><i class="material-icons">arrow_drop_down</i></button>
            </div>
          </div>
          <div class="product-price">{{ product.price }} SEK</div>
          <button class="add-cart-btn" type="button" name="button" @click="addToCart" :disabled="product.stock <= 0">Add to cart</button>
        </div>
      </div>
    </div>
    <div class="product-wrapper" v-if="product.gallery">
      <div class="product-gallery">
        <img class="gallery-img" v-for="galleryImg in product.gallery" :src="`http://localhost:8080/${galleryImg.path}`" :key="galleryImg.meta.asset" @click="openGalleryImg(galleryImg.path)">
      </div>
    </div>
    <div class="product-wrapper" v-else>
      <div class="no-img-msg">
        No images found
      </div>
    </div>
    <app-reviews v-if="Object.keys(product).length" :product="product"></app-reviews>
    <app-img-overlay v-if="galleryImgOpen" :galleryImgUrl="galleryImgUrl" :closeGalleryImg="closeGalleryImg"></app-img-overlay>
  </div>
</template>

<script>
import axios from 'axios';
import Reviews from './Reviews.vue';
import ImageOverlay from './ImageOverlay.vue';
import {cockpitToken, cockpitRootUrl} from '../constants';

export default {
  components: {
    appReviews: Reviews,
    appImgOverlay: ImageOverlay
  },
  data(){
    return {
      product: {},
      quantity: 1,
      galleryImgOpen: false,
      galleryImgUrl: ''
    }
  },
  computed: {
    stockAmount(){
      return `Stock: ${this.product.stock}`;
    }
  },
  methods: {
    openGalleryImg(url){
      this.galleryImgUrl = url;
      this.galleryImgOpen = true;
    },
    closeGalleryImg(){
      this.galleryImgOpen = false;
      this.galleryImgUrl = '';
    },
    incrementQuantity(){
      if(this.quantity === parseInt(this.product.stock)) return
      this.quantity++;
    },
    decrementQuantity(){
      this.quantity > 1 ? this.quantity-- : null;
    },
    addToCart(){
      if(parseInt(this.product.stock) === 0 || parseInt(this.product.stock) < this.quantity) return;
      let orderItem = {
        id: this.product._id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity
      }
      this.$store.dispatch('addToCart', orderItem);
    }
  },
  created(){
    axios.post(`${cockpitRootUrl}api/collections/get/products?token=${cockpitToken}`, {
      filter: {_id: this.$route.params.id},
    })
    .then((res) => {
      this.product = res.data.entries[0];
    })

  }
}
</script>

<style lang="css" scoped>
.product-container{
  position: relative;
  max-width: 100vw;
  min-height: 100vh;
  background: rgb(34,38,41);
  background: linear-gradient(32deg, rgba(34,38,41,1) 16%, rgba(71,75,79,1) 82%);
  padding: 110px 150px;
  box-sizing: border-box;
}
.product-wrapper{
  width: 100%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  background: rgb(60,67,73);
  background: linear-gradient(32deg, rgba(60,67,73,1) 23%, rgba(102,109,115,1) 100%);
  box-sizing: border-box;
  margin-bottom: 30px;
}
.upper-field{
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px 40px;
  box-sizing: border-box;
}
.product-title{
  font-size: 2.4rem;
  color: #86c232;
  margin: 0;
}
.content-field{
  padding: 20px 40px;
}
.product-description{
  font-size: 2rem;
  word-spacing: 2px;
  letter-spacing: 1px;
  line-height: 26px;
  color: #c3c8c9;
}
.product-gallery{
  font-size: 2rem;
}
.gallery-img{
  height: 200px;
  margin: 10px;
  opacity: 0.8;
  cursor: pointer;
}
.gallery-img:hover{
  opacity: 1;
}
.no-img-msg{
  display: flex;
  justify-content: center;
  padding: 30px;
  font-size: 2rem;
  color: #c3c8c9;
}
.lower-field{
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
}
.stock{
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #c3c8c9;
  margin-right: 10px;
  padding: 0 30px;
  background: rgba(255, 255, 255, 0.1);
}
.purchase-wrapper{
  display: flex;
}
.quantity-wrapper{
  position: relative;
  height: 70px;
  margin-right: 30px;
}
.product-quantity{
  font-size: 2rem;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0 90px 0 30px;
  box-sizing: border-box;
  color: #c3c8c9;
  height: 100%;
  width: 200px;
}
.product-quantity::-webkit-outer-spin-button,
.product-quantity::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.product-quantity[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
.quantity-actions-wrapper{
  position: absolute;
  right: 0;
  top: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-5px, -50%);
}
.quantity-action{
  background: rgba(97, 137, 47, 1);
  padding: 0 15px;
  margin: 3px 3px;
  border: none;
  color: #fff;
  cursor: pointer;
}
.quantity-action:disabled{
  opacity: 0.5;
  cursor: default;
}
.product-price{
  display: flex;
  align-items: center;
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: #c3c8c9;
  padding: 15px 20px;
}
.add-cart-btn{
  font-size: 2rem;
  border: none;
  color: #e9f0e2;
  background: rgba(97, 137, 47, 1);
  padding: 15px 20px;
  cursor: pointer;
}
.add-cart-btn:hover{
  background: rgba(97, 137, 47, 0.8);
}
.add-cart-btn:disabled{
  opacity: 0.5;
  cursor: default;
}
</style>
