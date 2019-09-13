<template lang="html">
  <div class="search-container">
    <input class="search-input" type="text" name="" value="" placeholder="search..." @input="changeSearchValue">
    <div class="search-options">
      <label class="search-label">Show only in stock:</label>
      <div class="search-checkbox-wrapper">
        <input class="search-checkbox" type="checkbox" @change="toggleStockFilter($event)">
        <span class="search-checkmark"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {cockpitToken, cockpitRootUrl} from '../constants';

export default {
  props: {
    searchValue: String,
    changeSearchValue: Function,
    toggleStockFilter: Function
  },
  watch: {
    searchValue(newSearchValue){
      if(newSearchValue){
        axios.post(`${cockpitRootUrl}api/collections/get/products?token=${cockpitToken}`,{
          filter: {
            name: { $regex: newSearchValue }
          },
          sort: {_created: -1}
        })
        .then((res) => {
          this.$store.dispatch('setSearchProducts', res.data.entries)
        })
      }
      else{
        this.$store.dispatch('clearSeachProducts');
      }
    }
  },
  destroyed(){
    this.$store.dispatch('clearSeachProducts');
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
.search-options{
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.search-checkbox-wrapper{
  position: relative;
  width: 40px;
  height: 40px;
}
.search-checkbox{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: 0.01;
  z-index: 1;
  cursor: pointer;
}
.search-checkbox:checked ~ .search-checkmark:after{
  display: block;
}
.search-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.search-checkmark{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
}
.search-checkmark:after {
  left: 23%;
  top: 48%;
  width: 13px;
  height: 25px;
  border: solid #86c232;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg) translate(-60%, -50%);
}
.search-label{
  font-size: 2rem;
  color: #86c232;
  margin-right: 15px;
}
</style>
