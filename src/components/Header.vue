<template lang="html">
  <header>
    <router-link class="menu-link" :to="{ name: 'home', params: {} }" exact tag="h1">Game Shop</router-link>
    <ul class="menu-list">
      <li><router-link class="menu-link" :to="{ name: 'cart', params: {} }"><i class="material-icons menu-icon">shopping_cart</i></router-link><span class="cart-amount">{{ getCartAmount }}</span></li>
    </ul>
  </header>
</template>

<script>
export default {
  computed: {
    getCartAmount(){
      return this.$store.getters.getCart.length;
    }
  }
}
</script>

<style lang="css" scoped>
header{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px 20px 50px;
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
  cursor: pointer;
}
.menu-list{
  display: flex;
}
li{
  list-style: none;
  position: relative;
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
.menu-icon{
  font-size: 4rem;
}
.cart-amount{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, 0);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #86c232;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  user-select: none;
}
</style>
