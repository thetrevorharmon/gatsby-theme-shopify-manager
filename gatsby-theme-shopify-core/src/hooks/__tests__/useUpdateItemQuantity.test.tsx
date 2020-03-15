import {act} from '@testing-library/react-hooks';
import {Mocks, getCurrentCart, renderHookWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useUpdateItemQuantity} from '../useUpdateItemQuantity';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useUpdateItemQuantity()', () => {
  it('updates the quantity for an item given a variant id', async () => {
    const newQuantity = 2;
    const {result, waitForNextUpdate} = await renderHookWithContext(() =>
      useUpdateItemQuantity(),
    );

    act(() => {
      result.current(Mocks.VARIANT_ID_IN_CART, newQuantity);
    });
    await waitForNextUpdate();

    const cart = getCurrentCart();
    const item = cart.lineItems.find(
      // @ts-ignore
      (item) => item.variant.id === Mocks.VARIANT_ID_IN_CART,
    );

    expect(item!.quantity).toBe(newQuantity);
  });

  it('throws an error if no variantId is provided', async () => {
    const {result} = await renderHookWithContext(() => useUpdateItemQuantity());

    // @ts-ignore
    await expect(result.current(null, 2)).rejects.toThrow(
      'Must provide a variant id',
    );
  });

  it('throws an error if no quantity is provided', async () => {
    const {result} = await renderHookWithContext(() => useUpdateItemQuantity());

    await expect(
      // @ts-ignore
      result.current(Mocks.VARIANT_ID_IN_CART, null),
    ).rejects.toThrow('Quantity must be greater than 0');
  });

  it('throws an error if quantity less than 0 is provided', async () => {
    const {result} = await renderHookWithContext(() => useUpdateItemQuantity());

    await expect(result.current(Mocks.VARIANT_ID_IN_CART, -1)).rejects.toThrow(
      'Quantity must be greater than 0',
    );
  });

  it('throws an error if a variant id is provided that cannot be found', async () => {
    const {result} = await renderHookWithContext(() => useUpdateItemQuantity());

    await expect(result.current('some_fake_id', 2)).rejects.toThrow(
      'Item with variantId some_fake_id not in cart',
    );
  });
});
