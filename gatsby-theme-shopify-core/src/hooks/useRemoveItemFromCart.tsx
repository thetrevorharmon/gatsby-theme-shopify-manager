import {useRemoveItemsFromCart} from './useRemoveItemsFromCart';

export function useRemoveItemFromCart() {
  const removeItemsFromCart = useRemoveItemsFromCart();

  return function removeItemFromCart(variantId: number | string) {
    if (variantId === '' || variantId == null) {
      console.error(new Error('VariantId must not be blank or null'));
      return false;
    }

    return removeItemsFromCart([String(variantId)]);
  };
}
