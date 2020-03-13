import React, {useState} from 'react';
import {wait, fireEvent} from '@testing-library/react';
import {renderWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useAddItemToCart} from '../useAddItemToCart';
import {AttributeInput} from '../../types';

function MockComponent({
  variantId,
  quantity,
  customAttributes,
}: {
  variantId: string | number;
  quantity: number;
  customAttributes?: AttributeInput[];
}) {
  const addItemToCart = useAddItemToCart();
  const [result, setResult] = useState<boolean | null>(null);

  async function addItem() {
    const newResult = await addItemToCart(
      variantId,
      quantity,
      customAttributes,
    );
    setResult(newResult);
  }

  return (
    <>
      <button type="button" onClick={addItem}>
        Add to Cart
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

describe('useAddItemToCart()', () => {
  it('returns true if the item is added to the cart', async () => {
    const wrapper = renderWithContext(
      <MockComponent variantId={'some_variant_id'} quantity={1} />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Add to Cart/));
    });

    expect(wrapper.getByText(/Result: true/)).toBeTruthy();
  });

  it('updates the cart state if the items are added to the cart', async () => {
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');
    const wrapper = renderWithContext(
      <MockComponent variantId="newVariantId" quantity={1} />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Add to Cart/));
    });

    const newCart = JSON.parse(
      LocalStorage.get(LocalStorageKeys.CART) || '',
    ) as ShopifyBuy.Cart;

    // @ts-ignore
    expect(newCart.lineItems.slice(-1)[0].variantId).toBe('newVariantId');
    expect(localStorageSpy).toHaveBeenCalledTimes(3);
  });

  it('returns false if there is no variantId passed to the function', async () => {
    // @ts-ignore
    const wrapper = renderWithContext(<MockComponent quantity={1} />);
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Add to Cart/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
  });

  it('returns false if there is no quantity passed to the function', async () => {
    // @ts-ignore
    const wrapper = renderWithContext(<MockComponent variantId="someId" />);
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Add to Cart/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
  });
});
