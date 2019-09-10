import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    products: [],
    searchProducts: [],
    searchValue: '',
    skipAmount: 0,
    cart: []
  },
  getters: {
    getProducts(state){
      return state.products;
    },
    getSearchProducts(state){
      return state.searchProducts;
    },
    getSkipAmount(state){
      return state.skipAmount;
    },
    getCart(state){
      return state.cart;
    },
    getTotalCost(state){
      let totalCost = 0;
      state.cart.forEach((item) => {
        totalCost += item.price * item.quantity;
      })
      return totalCost;
    }
  },
  mutations: {
    cartInit(state){
      state.cart = JSON.parse(localStorage.getItem('gameShopCart'));
    },
    setProducts(state, payload){
      payload.forEach((item) => {
        state.products.push(item);
      })
    },
    updateSkipAmount(state){
      state.skipAmount += 10;
    },
    addToCart(state, payload){
      let foundIdx = state.cart.findIndex((item) => payload.id === item.id);
      if(foundIdx === -1){
        state.cart.push(payload);
      }
      else{
        state.cart[foundIdx].quantity += payload.quantity;
      }
      localStorage.setItem('gameShopCart', JSON.stringify(state.cart))
    },
    removeCartItem(state, id){
      let foundIdx = state.cart.findIndex((item) => item.id === id);
      state.cart.splice(foundIdx, 1);
      localStorage.setItem('gameShopCart', JSON.stringify(state.cart))
    },
    setSearchProducts(state, payload){
      state.searchProducts = payload;
      console.log(state.searchProducts);
    },
    clearSeachProducts(state){
      state.searchProducts = [];
      console.log(state.searchProducts);
    }
  },
  actions: {
    cartInit({ commit }){
      commit('cartInit')
    },
    setProducts({ commit }, payload){
      commit('setProducts', payload);
    },
    updateSkipAmount({ commit }){
      commit('updateSkipAmount');
    },
    addToCart({ commit }, payload){
      commit('addToCart', payload);
    },
    removeCartItem({ commit }, payload){
      commit('removeCartItem', payload);
    },
    setSearchProducts({ commit }, payload){
      commit('setSearchProducts', payload);
    },
    clearSeachProducts({ commit }){
      commit('clearSeachProducts')
    }
  }
})
