import {LocalStorage} from '../../LocalStorage';
import {Mocks} from '../../../mocks';
import {LocalStorageKeys} from '../keys';

describe('LocalStorage.set()', () => {
  it('sets a key in localStorage', () => {
    const key = 'checkoutId';
    const value = 'checkout_1';

    const setItemSpy = jest.spyOn(window.localStorage, 'setItem');
    LocalStorage.set(key, value);

    expect(setItemSpy).toHaveBeenCalledWith(key, value);
  });
});

describe('LocalStorage.get()', () => {
  it('gets a value from localStorage', () => {
    const key = 'checkoutId';
    const value = 'checkout_1';
    LocalStorage.set(key, value);

    const getItemSpy = jest.spyOn(window.localStorage, 'getItem');
    const newValue = LocalStorage.get(key);

    expect(newValue).toBe(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });

  it('returns null when there is no value in localStorage', () => {
    const key = 'unknown_key';

    const getItemSpy = jest.spyOn(window.localStorage, 'getItem');
    const newValue = LocalStorage.get(key);

    expect(newValue).toBeNull();
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});

describe('LocalStorage.getInitialCart()', () => {
  it('returns a cart object if it exists', () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    expect(LocalStorage.getInitialCart()).toEqual(Mocks.CART);
  });

  it('returns null if there is no stored object', () => {
    LocalStorage.set(LocalStorageKeys.CART, '');
    expect(LocalStorage.getInitialCart()).toBeNull();
  });

  it('returns null if the stored object is invalid JSON', () => {
    LocalStorage.set(LocalStorageKeys.CART, "{id: 'asdf', lineItems: []");
    expect(LocalStorage.getInitialCart()).toBeNull();
  });

  it('returns null if the stored object is not a valid cart', () => {
    const badCart = {...Mocks.CART, type: {}};
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(badCart));

    expect(LocalStorage.getInitialCart()).toBeNull();
  });
});
