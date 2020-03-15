import {act} from '@testing-library/react-hooks';
import {Mocks, getCurrentCart, renderHookWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useRemoveItemFromCart} from '../useRemoveItemFromCart';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useRemoveItemFromCart()', () => {
  it('removes the item from the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');

    const {result, waitForNextUpdate} = await renderHookWithContext(() =>
      useRemoveItemFromCart(),
    );

    act(() => {
      result.current(Mocks.VARIANT_ID_IN_CART);
    });
    await waitForNextUpdate();

    const cart = getCurrentCart();

    function findInLineItems(variantId: string) {
      const result = cart.lineItems
        .map((lineItem) => {
          // @ts-ignore
          if (lineItem.variant.id === variantId) {
            return lineItem.id;
          }
          return null;
        })
        .filter(Boolean);
      return result;
    }

    expect(findInLineItems(Mocks.VARIANT_ID_IN_CART)).toHaveLength(0);
    expect(cart.lineItems).toHaveLength(Mocks.CART.lineItems.length - 1);
    expect(localStorageSpy).toHaveBeenCalledTimes(4);
  });

  it('throws an error if there is no variantId passed to the function', async () => {
    const {result} = await renderHookWithContext(() => useRemoveItemFromCart());

    // @ts-ignore
    await expect(result.current()).rejects.toThrow(
      'VariantId must not be blank or null',
    );
  });

  it('throws an error if a given variant Id is not found in the cart', async () => {
    const {result} = await renderHookWithContext(() => useRemoveItemFromCart());

    // @ts-ignore
    await expect(result.current('bogus_id')).rejects.toThrow(
      'Could not find line item in cart with variant id: bogus_id',
    );
  });
});
