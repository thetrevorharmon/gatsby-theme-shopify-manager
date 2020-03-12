import React from 'react';
import {wait} from '@testing-library/react';
import {Mocks, renderWithContext} from '../mocks';
import {LocalStorage, LocalStorageKeys} from '../utils';
import {useGetLineItem} from '../useGetLineItem';

function MockComponent({variantId}: {variantId: string}) {
  const getLineItem = useGetLineItem();
  const item = getLineItem(variantId);
  const content = item == null ? 'item not found' : item.id;
  return <p>{content}</p>;
}

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useGetLineItem()', () => {
  it('returns the item from the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const wrapper = renderWithContext(
      <MockComponent variantId={Mocks.VARIANT_ID_IN_CART} />,
    );

    await wait(() => {
      expect(wrapper.getByText(Mocks.CART.lineItems[0].id)).toBeTruthy();
    });
  });

  it('returns null if the cart is empty', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));
    const wrapper = renderWithContext(
      <MockComponent variantId={Mocks.VARIANT_ID_IN_CART} />,
      {
        shouldSetInitialCart: false,
      },
    );

    await wait(() => {
      expect(wrapper.getByText('item not found')).toBeTruthy();
    });
  });

  it('returns null if it cannot find the item', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const wrapper = renderWithContext(
      <MockComponent variantId="some_wrong_id" />,
      {
        shouldSetInitialCart: false,
      },
    );

    await wait(() => {
      expect(wrapper.getByText('item not found')).toBeTruthy();
    });
  });
});
