import {LocalStorage, LocalStorageKeys} from '../utils';
import ShopifyBuy from 'shopify-buy';

export function getCurrentCart(): ShopifyBuy.Cart {
  return JSON.parse(
    LocalStorage.get(LocalStorageKeys.CART) || '',
  ) as ShopifyBuy.Cart;
}
