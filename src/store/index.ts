import Vue from 'vue';
import Vuex, { Commit } from 'vuex';
import counter from './modules/counter';
import products from './modules/products';
import cart from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    counter,
    cart,
    products,
  },
  strict: process.env.NODE_ENV !== 'production',
});
