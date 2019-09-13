<template lang="html">
  <div class="home-container">
    <app-carousel></app-carousel>
    <app-search :searchValue="searchValue" :changeSearchValue="changeSearchValue" :toggleStockFilter="toggleStockFilter"></app-search>
    <app-products :searchValue="searchValue" :inStockOnly="inStockOnly"></app-products>
    <div ref="scrolltarget" class="scroll-target" v-show="!getSearchProducts.length && !searchValue"></div>
  </div>
</template>

<script>
import Carousel from './Carousel.vue';
import Products from './Products.vue';
import Search from './Search.vue';
import axios from 'axios';
import {cockpitToken, cockpitRootUrl} from '../constants';

export default {
  components: {
    appCarousel: Carousel,
    appProducts: Products,
    appSearch: Search
  },
  computed: {
    getSearchProducts(){
      return this.$store.getters.getSearchProducts;
    }
  },
  data(){
    return {
      myObserver: null,
      searchValue: '',
      inStockOnly: false
    }
  },
  methods: {
    toggleStockFilter(e){
      this.inStockOnly = e.target.checked
    },
    changeSearchValue(e){
      this.searchValue = e.target.value;
    },
    scrollTrigger(){
      this.myObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            axios.post(`${cockpitRootUrl}api/collections/get/products?token=${cockpitToken}`, {
              limit: 10,
              skip: this.$store.getters.getSkipAmount,
              sort: {_created: -1},
            })
            .then((res) => {
              this.$store.dispatch('setProducts', res.data.entries);
              this.$store.dispatch('updateSkipAmount');
            })
          }
        })
      })
      this.myObserver.observe(this.$refs.scrolltarget);
    }
  },
  mounted(){
    if(!this.$store.getters.getProducts.length){
      axios.post(`${cockpitRootUrl}api/collections/get/products?token=${cockpitToken}`, {
        limit: 10,
        skip: this.$store.getters.getSkipAmount,
        sort: {_created: -1},
      })
      .then((res) => {
        this.$store.dispatch('setProducts', res.data.entries);
        this.$store.dispatch('updateSkipAmount');
        this.scrollTrigger();
      })
    }
    else{
      this.scrollTrigger();
    }
  },
  beforeDestroy(){
    this.myObserver.unobserve(this.$refs.scrolltarget);
  }
}
</script>

<style lang="css" scoped>
.home-container{
  background: rgb(34,38,41);
  background: linear-gradient(32deg, rgba(34,38,41,1) 16%, rgba(71,75,79,1) 82%);
}
img{
  width: 100%;
}
.scroll-target{
  padding-bottom: 30px;
}
</style>
