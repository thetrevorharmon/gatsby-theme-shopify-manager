import {useAddItemsToCart} from './useAddItemsToCart';
import {AttributeInput} from '../types';

export function useAddItemToCart() {
  const addItemsToCart = useAddItemsToCart();

  return function addItemToCart(
    variantId: number | string,
    quantity: number,
    customAttributes?: AttributeInput[],
  ) {
    const item = [{variantId, quantity, customAttributes}];

    return addItemsToCart(item);
  };
}
