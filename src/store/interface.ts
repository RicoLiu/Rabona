import { Commit, Dispatch } from 'vuex';
import { CartState } from './modules/cart';
import { State as ProductsState } from './modules/products';

export interface ActionContextBasic {
  commit: Commit,
  dispatch: Dispatch,
};

export interface State {
  cart: CartState,
  products: ProductsState,
};

export type CheckoutStatus = 'successful' | 'failed' | null;

export interface Product {
  id: number,
  title: string,
  price: number,
  inventory: number,
};

export interface CartProduct {
  title: string,
  price: number,
  quantity: number,
};

export interface AddToCartPayload {
  id: number,
};