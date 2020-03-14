import {Mocks, renderHookWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useCartItems} from '../useCartItems';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useCartItems()', () => {
  it('returns the items in the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const {result} = renderHookWithContext(() => useCartItems());

    expect(result.current).toHaveLength(Mocks.CART.lineItems.length);
  });

  it('returns an empty array if the cart is null or empty', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));
    const {result} = renderHookWithContext(() => useCartItems(), {
      shouldSetInitialCart: false,
    });

    expect(result.current).toHaveLength(0);
  });
});
