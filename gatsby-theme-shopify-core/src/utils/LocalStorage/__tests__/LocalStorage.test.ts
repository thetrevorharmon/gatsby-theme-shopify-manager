import {LocalStorage} from '../../LocalStorage';

describe('LocalStorage.set()', () => {
  it('sets a key in localStorage', () => {
    const key = 'checkoutId';
    const value = 'checkout_1';

    const setItemSpy = jest.spyOn(window.localStorage, 'setItem');
    LocalStorage.set(value, key);

    expect(setItemSpy).toHaveBeenCalledWith(key, value);
  });
});

describe('LocalStorage.get()', () => {
  it('gets a value from localStorage', () => {
    const key = 'checkoutId';
    const value = 'checkout_1';
    LocalStorage.set(value, key);

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
