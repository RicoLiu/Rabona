<template>
  <div class="about">
    Clicked: {{ countNumber }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  computed: mapGetters('counter', [
    'evenOrOdd',
    'countNumber',
  ]),
  methods: {
    ...mapActions('counter', [
      'increment',
      'decrement',
      'incrementIfOdd',
      'incrementAsync',
    ]),
  },
});
</script>

