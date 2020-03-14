import {Mocks, renderHookWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useCartCount} from '../useCartCount';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useCartCount()', () => {
  it('returns the total number of items in the cart, factoring in quantity per variant', async () => {
    const {result} = renderHookWithContext(() => useCartCount());

    const lineItemVariantQuantity = Mocks.CART.lineItems.reduce(
      (quantity, lineItem) => {
        return lineItem.quantity + quantity;
      },
      0,
    );

    expect(result.current).toBe(lineItemVariantQuantity);
  });

  it('returns 0 if the cart is null or empty', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));
    const {result} = renderHookWithContext(() => useCartCount(), {
      shouldSetInitialCart: false,
    });

    expect(result.current).toBe(0);
  });
});
