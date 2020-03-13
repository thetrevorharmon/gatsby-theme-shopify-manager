import React from 'react';
import {Mocks, renderWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useCheckoutUrl} from '../useCheckoutUrl';

function MockComponent() {
  const checkoutUrl = useCheckoutUrl();
  const content = checkoutUrl == null ? 'empty' : checkoutUrl;
  return <p>{content}</p>;
}

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useCheckoutUrl()', () => {
  it('returns the checkout URL from the cart', async () => {
    const wrapper = renderWithContext(<MockComponent />);
    expect(wrapper.getByText(Mocks.CHECKOUT_URL)).toBeTruthy();
  });
});
