<template>
  <div class="page">
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <product-list></product-list>
    <hr>
    <cart></cart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductList from '@/components/ProductionList.vue';
import Cart from '@/components/Cart.vue';

@Component({
  components: {
  ProductList,
  Cart
  }
  })
export default class ShoppingCart extends Vue {}
</script>

<style lang="scss" scoped>
.page {
  padding: 0 0 40px 0;
}
</style>
