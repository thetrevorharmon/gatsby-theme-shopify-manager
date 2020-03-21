import {useContext} from 'react';
import {Context} from '../Context';

export function useClientUnsafe() {
  const {client} = useContext(Context);
  return client;
}
