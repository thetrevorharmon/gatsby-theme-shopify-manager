import {CART, VARIANT_ID_IN_CART, CHECKOUT_URL} from './cart';
import {EMPTY_CART} from './emptyCart';
import {PURCHASED_CART} from './purchasedCart';
import {CLIENT} from './client';
import {
  ACCESS_TOKEN,
  SHOP_NAME,
  SHOP_NAME_WITH_CUSTOM_DOMAIN,
  MYSHOPIFY_DOMAIN,
  CUSTOM_DOMAIN,
} from './constants';
import {
  wrapWithContext,
  renderWithContext,
  renderHookWithContext,
  renderHookWithContextSynchronously,
} from './contextWrappers';
import {getCurrentCart} from './getCurrentCart';

const Mocks = {
  CART,
  EMPTY_CART,
  PURCHASED_CART,
  CLIENT,
  ACCESS_TOKEN,
  SHOP_NAME,
  SHOP_NAME_WITH_CUSTOM_DOMAIN,
  MYSHOPIFY_DOMAIN,
  CUSTOM_DOMAIN,
  VARIANT_ID_IN_CART,
  CHECKOUT_URL,
};

export {
  Mocks,
  wrapWithContext,
  getCurrentCart,
  renderWithContext,
  renderHookWithContext,
  renderHookWithContextSynchronously,
};
