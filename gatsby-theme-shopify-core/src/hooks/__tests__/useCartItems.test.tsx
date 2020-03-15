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
    const {result} = await renderHookWithContext(() => useCartItems());

    expect(result.current).toHaveLength(Mocks.CART.lineItems.length);
  });

  it('returns an empty array if the cart is null or empty', async () => {
    (Mocks.CLIENT.checkout.fetch as jest.Mock).mockImplementationOnce(
      () => Mocks.EMPTY_CART,
    );

    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));
    const {result} = await renderHookWithContext(() => useCartItems(), {
      shouldSetInitialCart: false,
    });

    expect(result.current).toHaveLength(0);
  });
});
