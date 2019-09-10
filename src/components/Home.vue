<template lang="html">
  <div class="home-container">
    <app-carousel></app-carousel>
    <app-search :searchValue="searchValue" :changeSearchValue="changeSearchValue"></app-search>
    <app-products :searchValue="searchValue"></app-products>
    <div ref="scrolltarget" v-show="!getSearchProducts.length && !searchValue"></div>
  </div>
</template>

<script>
import Carousel from './Carousel.vue';
import Products from './Products.vue';
import Search from './Search.vue';
import axios from 'axios';

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
      searchValue: ''
    }
  },
  methods: {
    changeSearchValue(e){
      this.searchValue = e.target.value;
    },
    scrollTrigger(){
      this.myObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            const cockpitToken = '85c29250363d95b2b63ff2c7cb2016';
            axios.post(`http://localhost:8080/api/collections/get/products?token=${cockpitToken}`, {
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
  created(){
    const cockpitToken = '85c29250363d95b2b63ff2c7cb2016';
    axios.post(`http://localhost:8080/api/collections/get/products?token=${cockpitToken}`, {
      limit: 10,
      skip: this.$store.getters.getSkipAmount,
      sort: {_created: -1},
    })
    .then((res) => {
      console.log(res.data.entries);
      this.$store.dispatch('setProducts', res.data.entries);
      this.$store.dispatch('updateSkipAmount');
      this.scrollTrigger();
    })
  },
  beforeDestroy(){
    console.log('before')
    this.myObserver.unobserve(this.$refs.scrolltarget);
  }
}
</script>

<style lang="css" scoped>
.home-container{
  /* position: relative; */
  background: rgb(34,38,41);
  background: linear-gradient(32deg, rgba(34,38,41,1) 16%, rgba(71,75,79,1) 82%);
}
img{
  width: 100%;
}
</style>
