import {CART, VARIANT_ID_IN_CART, CHECKOUT_URL} from './cart';
import {EMPTY_CART} from './emptyCart';
import {CLIENT} from './client';
import {ACCESS_TOKEN, SHOP_NAME, DOMAIN} from './constants';
import {renderWithContext} from './renderWithContext';

const Mocks = {
  CART,
  EMPTY_CART,
  CLIENT,
  ACCESS_TOKEN,
  SHOP_NAME,
  DOMAIN,
  VARIANT_ID_IN_CART,
  CHECKOUT_URL,
};

export {Mocks, renderWithContext};
