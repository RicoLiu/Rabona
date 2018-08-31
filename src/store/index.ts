import Vue from 'vue';
import Vuex, { Commit } from 'vuex';
import counter from './modules/counter';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    counter,
  },
  strict: process.env.NODE_ENV !== 'production',
});
