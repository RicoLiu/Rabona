<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length">
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="p in products" :key="p.id">
        {{ p.title }} - {{ p.price | currency }} x {{ p.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p>
      <el-button type="primary" :disabled="!products.length" @click="checkout(products)">
        Checkout
      </el-button>
    </p>
    <p v-show="checkoutStatus">
      <el-tag :type="checkoutStatus === 'successful' ? 'success' : 'danger'">
        Checkout {{ checkoutStatus }}.
      </el-tag>
    </p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Button, Tag } from 'element-ui';

export default Vue.extend({

});
</script>

