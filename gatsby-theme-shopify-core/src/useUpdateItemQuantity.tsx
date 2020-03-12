import {useContext} from 'react';
import {Context} from './Context';

import {useGetLineItem} from './useGetLineItem';

export function useUpdateItemQuantity() {
  const {client, cart, setCart} = useContext(Context);
  const getLineItem = useGetLineItem();

  async function updateItemQuantity(
    variantId: string | number,
    quantity: number,
  ) {
    if (variantId == null) {
      console.error('Must provide a variant id');
      return false;
    }

    if (Number(quantity) < 1) {
      console.error('Quantity must be greater than 1');
      return false;
    }

    const lineItem = getLineItem(variantId);

    if (lineItem == null) {
      console.error(`Item with variantId ${variantId} not in cart`);
      return false;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const newCart = await client.checkout.updateLineItems(cart.id, [
        {id: lineItem.id, quantity},
      ]);
      setCart(newCart);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return updateItemQuantity;
}
