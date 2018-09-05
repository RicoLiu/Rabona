import { Commit, GetterTree, Getter } from 'vuex';
import shop from '../../api/shop';
import * as types from '../utils';
import { CheckoutStatus, CartProduct, AddToCartPayload } from '../interface';

interface Shape {
  id: number,
  quantity: number,
}

interface CheckoutFailurePayload {
  savedCartItems: Shape[],
}

export interface CartState {
  added: Shape[],
  checkoutStatus: CheckoutStatus,
}

// initial state
// shape: [{ id, quantity }]
const initState: CartState = {
  added: [],
  checkoutStatus: null,
};

// getters
const getters: GetterTree<any, any> = {
  checkoutStatus: (state: CartState) => state.checkoutStatus,
};

// actions
const actions = {
  checkout(context: { commit: Commit; state: CartState }, products: CartProduct[]) {
    const failurePayload: CheckoutFailurePayload = {
      savedCartItems: [...context.state.added],
    };
    context.commit(types.CHECKOUT_REQUEST);
    shop.buyProducts(
      products,
      () => context.commit(types.CHECKOUT_SUCCESS),
      () => context.commit(types.CHECKOUT_FAILURE, failurePayload),
    );
  },
};

// mutations
const mutations = {
  [types.ADD_TO_CART](state: CartState, payload: AddToCartPayload) {
    state.checkoutStatus = null;
    const record = state.added.find(p => p.id === payload.id);
    if (!record) {
      state.added.push({
        id: payload.id,
        quantity: 1,
      });
    } else {
      record.quantity += 1;
    }
  },

  [types.CHECKOUT_REQUEST](state: CartState) {
    // clear cart
    state.added = [];
    state.checkoutStatus = null;
  },

  [types.CHECKOUT_SUCCESS](state: CartState) {
    state.checkoutStatus = 'successful';
  },

  [types.CHECKOUT_FAILURE](state: CartState, payload: CheckoutFailurePayload) {
    // rollback to the cart saved before sending the request
    state.added = payload.savedCartItems;
    state.checkoutStatus = 'failed';
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
