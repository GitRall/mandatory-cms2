<template lang="html">
  <div class="products-container">
    <router-link class="product-wrapper" v-for="product in getProducts" :key="product._id" :to="{ name: 'product', params: { id: product._id } }" tag="div">
      <div class="img-wrapper">
        <img class="product-img" :src="`http://localhost:8080/${product.images.path}`" :alt="product.name">
      </div>
      <div class="product-info">
        <h4 class="product-name">{{ product.name }}</h4>
        <span class="product-price">{{ product.price }} SEK</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    getProducts(){
      return this.$store.getters.getProducts;
    }
  }
}
</script>

<style lang="css" scoped>
.products-container{
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
}
.product-wrapper{
  width: calc(33.33% - 80px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin: 30px 40px;
  cursor: pointer;
  background: rgb(60,67,73);
  background: linear-gradient(32deg, rgba(60,67,73,1) 23%, rgba(102,109,115,1) 100%);
  transition: transform ease-in-out 0.2s;
}
.product-wrapper:hover{
  transform: scale(1.02);
}
.img-wrapper{
  height: 250px;
}
.product-img{
  width: 100%;
  height: 100%;
}
.product-info{
  border-top: 4px solid #61892f;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.product-name{
  font-size: 2rem;
  color: #86c232;
  margin: 10px 0;
}
.product-price{
  font-size: 1.6rem;
  color: #c3c8c9;
  font-weight: 600;
}
</style>
