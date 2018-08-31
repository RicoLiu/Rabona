import { ActionTree, GetterTree, MutationTree } from 'vuex';

export interface CountState {
  count: number
}
// inital state
const state: CountState = {
  count: 0,
};
// mutation
const mutations: MutationTree<any> = {
  increment() {
    state.count += 1;
  },
  decrement() {
    state.count -= 1;
  },
};
// actions
const actions: ActionTree<any, any> = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd({ commit }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment');
    }
  },
  incrementAsync({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment');
        resolve();
      }, 1000);
    });
  },
};
// getters
const getters: GetterTree<any, any> = {
  evenOrOdd() {
    return state.count % 2 === 0 ? 'even' : 'odd';
  },
  countNumber: () => state.count,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
