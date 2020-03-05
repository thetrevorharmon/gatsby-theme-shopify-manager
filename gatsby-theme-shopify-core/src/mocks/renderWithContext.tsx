import React from 'react';
import {render} from '@testing-library/react';
import {ContextProvider} from '../ContextProvider';
import {DOMAIN, ACCESS_TOKEN} from './constants';
import {CART} from './cart';
import {LocalStorage, LocalStorageKeys} from '../utils';

interface Options {
  shopName: string;
  accessToken: string;
  shouldSetInitialCart: boolean;
}

export function renderWithContext(
  component: JSX.Element,
  givenOptions?: Partial<Options>,
) {
  const defaults = {
    shopName: DOMAIN,
    accessToken: ACCESS_TOKEN,
    shouldSetInitialCart: true,
  };

  const options = Object.assign({}, defaults, givenOptions);

  if (options.shouldSetInitialCart) {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(CART));
  }

  return render(
    <ContextProvider
      shopName={options.shopName}
      accessToken={options.accessToken}
    >
      {component}
    </ContextProvider>,
  );
}
