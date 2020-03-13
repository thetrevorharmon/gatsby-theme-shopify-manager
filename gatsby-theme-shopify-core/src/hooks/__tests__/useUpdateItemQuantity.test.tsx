import React, {useState} from 'react';
import {wait, fireEvent} from '@testing-library/react';
import {Mocks, renderWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useUpdateItemQuantity} from '../useUpdateItemQuantity';

function MockComponent({
  variantId,
  quantity,
}: {
  variantId: string | number;
  quantity: number;
}) {
  const updateItemQuantity = useUpdateItemQuantity();
  const [result, setResult] = useState<boolean | null>(null);

  async function updateItem() {
    const newResult = await updateItemQuantity(variantId, quantity);
    setResult(newResult);
  }

  return (
    <>
      <button type="button" onClick={updateItem}>
        Update Quantity
      </button>
      <p>Result: {String(result)}</p>
    </>
  );
}

const originalError = console.error;
const mockConsoleError = jest.fn();

beforeEach(() => {
  console.error = mockConsoleError;
});

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
  console.error = originalError;
});

describe('useUpdateItemQuantity()', () => {
  it('returns true if the item quantity is updated', async () => {
    const wrapper = renderWithContext(
      <MockComponent variantId={Mocks.VARIANT_ID_IN_CART} quantity={2} />,
    );

    await wait(() => {
      fireEvent.click(wrapper.getByText(/Update Quantity/));
    });

    const newCart = JSON.parse(
      LocalStorage.get(LocalStorageKeys.CART)!,
    ) as ShopifyBuy.Cart;

    const item = newCart.lineItems.find(
      // @ts-ignore
      (item) => item.variant.id === Mocks.VARIANT_ID_IN_CART,
    );

    expect(item!.quantity).toBe(2);
    expect(wrapper.getByText(/Result: true/)).toBeTruthy();
  });

  it('returns false if no variantId is provided', async () => {
    const wrapper = renderWithContext(
      // @ts-ignore
      <MockComponent variantId={null} quantity={2} />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Update Quantity/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
    expect(mockConsoleError).toHaveBeenCalledWith('Must provide a variant id');
  });

  it('returns false if no quantity is provided', async () => {
    const wrapper = renderWithContext(
      // @ts-ignore
      <MockComponent variantId={Mocks.VARIANT_ID_IN_CART} quantity={null} />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Update Quantity/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Quantity must be greater than 1',
    );
  });

  it('returns false if a variant id is provided that cannot be found', async () => {
    const wrapper = renderWithContext(
      // @ts-ignore
      <MockComponent variantId="some_unknown_variant_id" quantity={2} />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Update Quantity/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Item with variantId some_unknown_variant_id not in cart',
    );
  });
});
