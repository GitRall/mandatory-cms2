<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    appHeader: Header
  },
  created(){
    this.$store.dispatch('cartInit');
  }
}
</script>

<style>
*{
  font-size: 62.5%;
  font-family: 'Roboto', sans-serif;
}
body{
  margin: 0;
}
</style>
