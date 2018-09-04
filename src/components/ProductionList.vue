<template>
  <ul class="list">
    <li v-for="p in products" :key="p.id">
      {{ p.title }} - {{ p.price | currency }}
      <br>
      <el-button
        :disabled="!p.inventory"
        @click="addToCart(p)">
        Add to cart
      </el-button>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Button } from 'element-ui';

import { Product } from '../store/interface';
import store from '../store/index';

Vue.use(Button);

const dispatchAddToCart = (product: Product) => store.dispatch('addToCart', product);

export default Vue.extend({
  computed: {
    products(): Product[] {
      return this.$store.getters.allProducts;
    },
  },
  methods: {
    addToCart(p: Product) {
      dispatchAddToCart(p);
    },
  },
  created() {
    this.$store.dispatch('getAllProducts');
  },
});
</script>
