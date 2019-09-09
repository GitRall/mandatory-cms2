<template lang="html">
  <header>
    <h1>Game Shop</h1>
    <ul class="menu-list">
      <li><router-link class="menu-link" :to="{ name: 'home', params: {} }" exact>Home</router-link></li>
      <li><router-link class="menu-link" :to="{ name: 'cart', params: {} }">Shopping cart</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
header{
  position: absolute;
  display: flex;
  align-items: center;
  padding: 20px 30px;
  width: 100%;
  height: 80px;
  background: rgba(200, 200, 200, 0.3);
  z-index: 1;
  border-bottom: 2px solid rgba(200, 200, 200, 0.2);
  box-sizing: border-box;
}
h1{
  margin: 0 30px 0 0;
  font-size: 3rem;
  color: #fff;
}
.menu-list{
  display: flex;
}
li{
  list-style: none;
}
.menu-link{
  font-size: 2.4rem;
  list-style: none;
  margin: 0 20px;
  color: #fff;
  text-decoration: none;
}
.menu-link:hover{
  color: #86c232;
}
.router-link-active{
  color: #86c232;
}
</style>
