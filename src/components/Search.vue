<template lang="html">
  <div class="search-container">
    <input class="search-input" type="text" name="" value="" placeholder="search..." @input="changeSearchValue">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    searchValue: String,
    changeSearchValue: Function
  },
  // data(){
  //   return {
  //     searchValue: ''
  //   }
  // },
  methods: {
    test(){
      console.log('heeej');
    }
  },
  watch: {
    searchValue(newSearchValue, oldSearchValue){
      if(newSearchValue){
        const cockpitToken = '85c29250363d95b2b63ff2c7cb2016';
        axios.post(`http://localhost:8080/api/collections/get/products?token=${cockpitToken}`,{
          filter: {
            name: { $regex: newSearchValue }
          }
        })
        .then((res) => {
          console.log(res);
          this.$store.dispatch('setSearchProducts', res.data.entries)
        })
      }
      else{
        this.$store.dispatch('clearSeachProducts')
      }
    }
  }
}
</script>

<style lang="css" scoped>
.search-container{
  padding: 70px;
}
.search-input{
  width: 100%;
  font-size: 3rem;
  padding: 20px 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #c3c8c9;
  box-sizing: border-box;
}
.search-input:focus{
  outline-color: #86c232;
}
</style>
