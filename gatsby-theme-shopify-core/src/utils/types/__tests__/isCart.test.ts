import {isCart} from '../isCart';
import {Mocks} from '../../../mocks';

describe('isCart()', () => {
  it('returns true for an input that is a valid Cart', () => {
    expect(isCart(Mocks.CART)).toBe(true);
  });

  it('returns false for an input that is not a valid Cart', () => {
    const badCart = {
      id: 'some id',
      lineItems: null,
    };

    expect(isCart(badCart)).toBe(false);
    expect(isCart('')).toBe(false);
    expect(isCart({})).toBe(false);
    expect(isCart(null)).toBe(false);
  });
});
