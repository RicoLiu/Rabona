<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input class="toggle-all" id="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <TodoItem
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key, index) in filters" :key="index">
          <a :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <button class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import TodoItem from '../components/TodoItem.vue';

const filters = {
  all: (todos: any) => todos,
  active: (todos: any) => todos.filter((todo: any) => !todo.done),
  completed: (todos: any) => todos.filter((todo: any) => todo.done),
};

export default Vue.extend({
  components: { TodoItem },
  data() {
    return {
      visibility: 'all',
      filters: filters,
    };
  },
  computed: {
    todos(): any {
      return this.$store.state.todos;
    },
    allChecked(): any {
      return this.todos.every((todo: any) => todo.done);
    },
    filteredTodos(): any {
      return filters[this.visibility](this.todos);
    },
    remaining(): any {
      return this.todos.filter((todo: any) => !todo.done).length;
    },
  },
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted',
    ]),
    addTodo(e: any) {
      const text = e.target.value;
      if (text.trim()) {
        this.$store.dispatch('addTodo', text);
      }
      e.target.value = '';
    },
  },
  filters: {
    pluralize: (n: any, w: any) => n === 1 ? w : (w + 's'),
    capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  },
});
</script>
