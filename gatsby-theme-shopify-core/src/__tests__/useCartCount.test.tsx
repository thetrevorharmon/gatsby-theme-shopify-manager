import React from 'react';
import {render, wait} from '@testing-library/react';
import {ContextProvider} from '../ContextProvider';
import {Mocks} from '../mocks';
import {LocalStorage, LocalStorageKeys} from '../utils';
import {useCartCount} from '../useCartCount';

function MockComponent() {
  const count = useCartCount();
  return <p>{count}</p>;
}

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useCartCount()', () => {
  it('returns the total number of items in the cart, factoring in quantity per variant', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));

    const wrapper = render(
      <ContextProvider shopName={Mocks.DOMAIN} accessToken={Mocks.ACCESS_TOKEN}>
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(Mocks.CART.lineItems).toHaveLength(2);
      expect(wrapper.getByText('3')).toBeTruthy();
    });
  });

  it('returns 0 if the cart is null or empty', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));

    const wrapper = render(
      <ContextProvider shopName={Mocks.DOMAIN} accessToken={Mocks.ACCESS_TOKEN}>
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(wrapper.getByText('0')).toBeTruthy();
    });
  });
});
