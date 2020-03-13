import React from 'react';
import {wait} from '@testing-library/react';
import {Mocks, renderWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useCartItems} from '../useCartItems';

function MockComponent() {
  const items = useCartItems();
  // @ts-ignore
  const content = items.length > 0 ? items[0].variant.id : 'empty';
  return <p>{content}</p>;
}

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useCartItems()', () => {
  it('returns the items in the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const wrapper = renderWithContext(<MockComponent />);

    await wait(() => {
      expect(
        wrapper.getByText(Mocks.CART.lineItems[0].variant.id),
      ).toBeTruthy();
    });
  });

  it('returns an empty array if the cart is null or empty', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));
    const wrapper = renderWithContext(<MockComponent />, {
      shouldSetInitialCart: false,
    });

    await wait(() => {
      expect(wrapper.getByText('empty')).toBeTruthy();
    });
  });
});
