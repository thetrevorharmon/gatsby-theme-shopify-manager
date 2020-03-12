import {useCart} from './useCart';

export function useCheckoutUrl(): string | null {
  const {cart} = useCart();
  if (cart == null) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return cart.webUrl;
}
