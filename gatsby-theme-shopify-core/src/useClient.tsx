import {useContext} from 'react';
import {Context} from './Context';

export function useClient() {
  const {client} = useContext(Context);
  return client;
}
