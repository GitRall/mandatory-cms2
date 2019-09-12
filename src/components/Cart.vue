<template lang="html">
  <div class="cart-container">
    <div class="cart-wrapper">
      <table v-if="getCart.length">
        <tbody>
          <tr class="cart-item" v-for="cartItem in getCart" :key="cartItem.id">
            <td><router-link class="cart-item-name" :to="{ name: 'product', params: { id: cartItem.id } }" tag="span">{{ cartItem.name }}</router-link></td>
            <td class="cart-item-quantity">{{ cartItem.quantity }}x</td>
            <td class="cart-item-price">{{ cartItem.price }} SEK</td>
            <td class="cart-item-delete"><i class="material-icons delete-icon" @click="removeCartItem(cartItem.id)">delete</i></td>
          </tr>
        </tbody>
      </table>
      <div class="empty-cart-msg" v-else>
        Your shopping cart is empty
      </div>
    </div>
    <div class="cart-wrapper" v-if="getCart.length">
      <div class="total-price-wrapper">
        <span class="total-price-head">
          Total
        </span>
        <span class="total-price">
          {{ getTotalCost }}
          <button class="checkout-btn" type="button" name="button" @click="goCheckout">Checkout</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getCart(){
      return this.$store.getters.getCart;
    },
    getTotalCost(){
      return `${this.$store.getters.getTotalCost} SEK`;
    }
  },
  methods: {
    removeCartItem(id){
      this.$store.dispatch('removeCartItem', id);
    },
    goCheckout(){
      this.$router.push({name: 'checkout'});
    }
  }
}
</script>

<style lang="css" scoped>
.cart-container{
  max-width: 100vw;
  min-height: 100vh;
  background: rgb(34,38,41);
  background: linear-gradient(32deg, rgba(34,38,41,1) 16%, rgba(71,75,79,1) 82%);
  padding: 110px 250px;
  box-sizing: border-box;
}
.cart-wrapper{
  width: 100%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  background: rgb(60,67,73);
  background: linear-gradient(32deg, rgba(60,67,73,1) 23%, rgba(102,109,115,1) 100%);
  box-sizing: border-box;
  margin-bottom: 30px;
  padding: 30px 50px;
}
table{
  width: 100%;
  border-collapse: collapse;
}
tbody{
  width: 100%;
}
.cart-item{
  height: 100px;
  margin: 30px 0;
}
td{
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.cart-item-name{
  font-size: 2.4rem;
  color: #86c232;
  cursor: pointer;
}
.cart-item-name:hover{
  opacity: 0.8;
}
.cart-item-quantity{
  font-size: 2rem;
  color: #c3c8c9;
  width: 100px;
  text-align: center;
}
.cart-item-price{
  font-size: 2rem;
  color: #c3c8c9;
  width: 100px;
  text-align: center;
}
.cart-item-delete{
  width: 100px;
  text-align: center;
}
.delete-icon{
  color: #c3c8c9;
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
}
.delete-icon:hover{
  color: #FF5252;
}
.total-price-wrapper{
  display: flex;
  flex-direction: column;
}
.total-price-head{
  font-size: 2.4rem;
  color: #86c232;
}
.total-price{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  font-size: 2.4rem;
  color: #c3c8c9;
}
.checkout-btn{
  border: none;
  background: rgba(97, 137, 47, 1);
  padding: 15px 20px;
  font-size: 2rem;
  color: #e9f0e2;
  cursor: pointer;
}
.checkout-btn:hover{
  background: rgba(97, 137, 47, 0.8);
}
.empty-cart-msg{
  display: flex;
  justify-content: center;
  font-size: 2.4rem;
  color: #c3c8c9;
}
</style>
