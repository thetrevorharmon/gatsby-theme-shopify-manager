import {LocalStorage, LocalStorageKeys} from '../../utils';
import {Mocks, renderHookWithContext} from '../../mocks';
import {useCheckoutUrl} from '../useCheckoutUrl';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useCheckoutUrl()', () => {
  it('returns the checkout URL from the cart', async () => {
    const {result} = await renderHookWithContext(() => useCheckoutUrl());

    expect(result.current).toBe(Mocks.CHECKOUT_URL);
  });
});
