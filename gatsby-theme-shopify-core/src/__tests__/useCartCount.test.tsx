import React from 'react';
import {wait} from '@testing-library/react';
import {Mocks, renderWithContext} from '../mocks';
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
    const wrapper = renderWithContext(<MockComponent />);

    await wait(() => {
      expect(Mocks.CART.lineItems).toHaveLength(2);
      expect(wrapper.getByText('3')).toBeTruthy();
    });
  });

  it('returns 0 if the cart is null or empty', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));
    const wrapper = renderWithContext(<MockComponent />, {
      shouldSetInitialCart: false,
    });

    await wait(() => {
      expect(wrapper.getByText('0')).toBeTruthy();
    });
  });
});
