import {act} from '@testing-library/react-hooks';
import {Mocks, getCurrentCart, renderHookWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useAddItemToCart} from '../useAddItemToCart';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useAddItemToCart()', () => {
  it('adds the item to the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');

    const {result, waitForNextUpdate} = await renderHookWithContext(() =>
      useAddItemToCart(),
    );

    act(() => {
      result.current('newVariantId', 1);
    });
    await waitForNextUpdate();

    const cart = getCurrentCart();

    // @ts-ignore
    expect(cart.lineItems.slice(-1)[0].variantId).toBe('newVariantId');
    expect(localStorageSpy).toHaveBeenCalledTimes(4);
  });

  it('throws an error if the given line item has no variant id', async () => {
    const {result} = await renderHookWithContext(() => useAddItemToCart());

    // @ts-ignore
    await expect(result.current()).rejects.toThrow('Missing variantId in item');
  });

  it('throws an error if the given line item has no quantity', async () => {
    const {result} = await renderHookWithContext(() => useAddItemToCart());

    // @ts-ignore
    await expect(result.current('some_id')).rejects.toThrow(
      'Missing quantity in item with variant id: some_id',
    );
  });

  it('throws an error if the given line item has a quantity that is not numeric', async () => {
    const {result} = await renderHookWithContext(() => useAddItemToCart());

    await expect(
      // @ts-ignore
      result.current('some_id', 'one'),
    ).rejects.toThrow(
      'Quantity is not a number in item with variant id: some_id',
    );
  });

  it('throws an error if the given line item has a quantity that is less than one', async () => {
    const {result} = await renderHookWithContext(() => useAddItemToCart());

    await expect(
      // @ts-ignore
      result.current('some_id', 0),
    ).rejects.toThrow(
      'Quantity must not be less than one in item with variant id: some_id',
    );
  });
});
