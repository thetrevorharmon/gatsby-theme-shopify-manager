import {useContext} from 'react';
import {Context} from '../Context';
import ShopifyBuy from 'shopify-buy';
import {LineItemPatch} from '../types';

export function useAddItemsToCart() {
  const {client, cart, setCart} = useContext(Context);

  async function addItemsToCart(items: LineItemPatch[]) {
    if (cart == null || client == null) {
      console.error('Called addItemsToCart too soon');
      return false;
    }

    if (items.length < 1) {
      console.error(
        'Must include at least one line item, empty line items found',
      );
      return false;
    }

    try {
      const newCart = await client.checkout.addLineItems(
        cart.id,
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        items as ShopifyBuy.LineItem[],
      );
      setCart(newCart);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return addItemsToCart;
}
