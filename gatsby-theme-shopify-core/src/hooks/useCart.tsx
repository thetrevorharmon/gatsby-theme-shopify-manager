import {useContext} from 'react';
import {Context} from '../Context';

export function useCart() {
  const {cart, setCart} = useContext(Context);
  return {cart, setCart};
}
