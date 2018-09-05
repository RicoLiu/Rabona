import Vue from 'vue';
import Vuex, { Commit } from 'vuex';
import counter from './modules/counter';
import products from './modules/products';
import cart from './modules/cart';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    counter,
    cart,
    products,
  },
  strict: process.env.NODE_ENV !== 'production',
});
