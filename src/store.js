import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    products: [],
    skipAmount: 0
  },
  getters: {
    getProducts(state){
      return state.products;
    },
    getSkipAmount(state){
      return state.skipAmount;
    }
  },
  mutations: {
    setProducts(state, payload){
      payload.forEach((item) => {
        state.products.push(item);
      })
    },
    updateSkipAmount(state){
      state.skipAmount += 10;
    }
  },
  actions: {
    setProducts({ commit }, payload){
      commit('setProducts', payload);
    },
    updateSkipAmount({ commit }){
      commit('updateSkipAmount');
    }
  }
})
