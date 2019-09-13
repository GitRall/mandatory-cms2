<template lang="html">
  <div class="checkout-container">
    <div class="checkout-wrapper">
      <form @submit.prevent="sendOrder()">
        <label for="">Name</label>
        <input class="checkout-input" type="text" required v-model="name">
        <label for="">Address</label>
        <input class="checkout-input" type="text" required v-model="address">
        <button class="submit-btn" type="submit" name="button">Send Order</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {cockpitToken, cockpitRootUrl} from '../constants';

export default {
  data(){
    return {
      name: '',
      address: ''
    }
  },
  methods: {
    sendOrder(){
      if(!this.name || !this.address) {
        return
      }
      else{
        let mappedProducts = this.$store.getters.getCart.map((item) => {
          return {
            value: {
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity
            }
          }
        })
        let orderObj = {
          name: this.name,
          address: this.address,
          totalPrice: this.$store.getters.getTotalCost,
          products: mappedProducts
        }
        axios.post(`${cockpitRootUrl}api/collections/save/orders?token=${cockpitToken}`, { data: orderObj })
          .then(() => {
            this.$store.getters.getCart.forEach((item) => {
              axios.post(`${cockpitRootUrl}api/collections/get/products?token=${cockpitToken}`, {
                filter: {_id: item.id}
              })
              .then((res) => {
                let newStock = res.data.entries[0].stock - item.quantity;
                axios.post(`${cockpitRootUrl}api/collections/save/products?token=${cockpitToken}`, {
                  data: {
                    _id: res.data.entries[0]._id,
                    stock: newStock
                  }
                })
              })
            })
            this.$store.dispatch('clearCart');
            this.$router.push({name: 'orderSent'});
          })
        }
      }
  }
}
</script>

<style lang="css" scoped>
.checkout-container{
  max-width: 100vw;
  min-height: 100vh;
  background: rgb(34,38,41);
  background: linear-gradient(32deg, rgba(34,38,41,1) 16%, rgba(71,75,79,1) 82%);
  padding: 110px 250px;
  box-sizing: border-box;
}
.checkout-wrapper{
  width: 100%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  background: rgb(60,67,73);
  background: linear-gradient(32deg, rgba(60,67,73,1) 23%, rgba(102,109,115,1) 100%);
  box-sizing: border-box;
  margin-bottom: 30px;
  padding: 30px 50px;
}
form{
  display: flex;
  flex-direction: column;
}
label{
  font-size: 2.4rem;
  color: #86c232;
}
.checkout-input{
  width: 100%;
  font-size: 3rem;
  padding: 20px 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #c3c8c9;
  box-sizing: border-box;
  margin-bottom: 30px;
}
.submit-btn{
  align-self: flex-end;
  font-size: 2rem;
  border: none;
  padding: 10px 15px;
  background: rgba(97, 137, 47, 1);
  color: #e9f0e2;
  cursor: pointer;
}
.submit-btn:hover{
  background: rgba(97, 137, 47, 0.8);
}
</style>
