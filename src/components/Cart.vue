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
import { CartProduct, CheckoutStatus } from '../store/interface';
import store from '../store/index';

Vue.use(Button);
Vue.use(Tag);

const dispatchCheckout = (products: CartProduct[]) => store.dispatch('checkout', products);

export default Vue.extend({
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus',
    }),
    products(): CartProduct[] {
      return this.$store.getters.cartProducts;
    },
    checkoutStatus(): CheckoutStatus {
      return this.$store.getters.checkoutStatus;
    },
    total(): number {
      return this.products.reduce((total, p) => total + (p.price * p.quantity), 0);
    },
  },
  methods: {
    checkout(products: CartProduct[]) {
      dispatchCheckout(products);
    },
  },
});
</script>

