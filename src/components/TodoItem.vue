<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        :checked="todo.done"
        @change="toggleTodo(todo)">
      <label v-text="todo.text" @dblclick="editing = true"></label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default {
  name: 'Todo',
  props: ['todo'],
  data () {
    return {
      editing: false,
    };
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        this.$nextTick(() => {
          el.focus();
        });
      }
    },
  },
  methods: {
    ...mapActions([
      'editTodo',
      'toggleTodo',
      'removeTodo',
    ]),
    doneEdit (e: any) {
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        this.$store.dispatch('removeTodo', todo);
      } else if (this.editing) {
        this.$store.dispatch('editTodo', {
          todo,
          value,
        });
        this.editing = false;
      }
    },
    cancelEdit (e: any) {
      e.target.value = this.todo.text;
      this.editing = false;
    }
  }
}
</script>