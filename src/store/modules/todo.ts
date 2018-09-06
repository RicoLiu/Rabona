import { ActionTree, GetterTree, MutationTree } from 'vuex';
import * as types from '../utils';
import createLogger from 'vuex/dist/logger';

const state = {
  todos: JSON.parse(window.localStorage.getItem(types.STORAGE_KEY) || '[]'),
};

// actions
const actions: ActionTree<any, any> = {
  addTodo ({ commit }, text) {
    commit('addTodo', {
      text,
      done: false,
    });
  },
  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo);
  },
  toggleTodo ({ commit }, todo) {
    commit('editTodo', { todo, done: !todo.done });
  },
  editTodo ({ commit }, { todo, value }) {
    commit('editTodo', { todo, text: value });
  },
  toggleAll ({ state, commit }, done) {
    state.todos.forEach((todo: any) => {
      commit('editTodo', { todo, done });
    })
  },
  clearCompleted ({ state, commit }) {
    state.todos.filter((todo: any) => todo.done)
      .forEach((todo: any) => {
        commit('removeTodo', todo);
      });
  },
};
// mutations
const mutations: MutationTree<any> = {
  addTodo (state, todo) {
    state.todos.push(todo);
  },

  removeTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  editTodo (state, { todo, text = todo.text, done = todo.done }) {
    todo.text = text;
    todo.done = done;
  },
};
// plugins
const localStoragePlugin = (store: any) => {
  store.subscribe((mutation: any, todos: any ) => {
    window.localStorage.setItem(types.STORAGE_KEY, JSON.stringify(todos));
  });
};

export default {
  state,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger({}) ,localStoragePlugin] : [localStoragePlugin],
};