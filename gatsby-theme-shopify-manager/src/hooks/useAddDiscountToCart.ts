import {useContext} from 'react';
import {Context} from '../Context';

export function useAddDiscountToCart() {
  const {client, cart, setCart} = useContext(Context);

  async function addDiscountToCart(discountCode: string) {
    if (cart == null || client == null) {
      throw new Error('Called addDiscountToCart too soon');
    }

    if (discountCode.length < 1) {
      throw new Error('Discount code isnt allowed to be empty');
    }

    const newCart = await client.checkout.addDiscount(
      cart.id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      discountCode,
    );
    setCart(newCart);

  }


  return addDiscountToCart;
}
