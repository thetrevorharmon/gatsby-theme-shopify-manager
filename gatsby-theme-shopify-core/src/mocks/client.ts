import {CART} from './cart';

export const CLIENT = {
  product: {},
  collection: {},
  checkout: {
    create: jest.fn(() => CART),
    fetch: jest.fn(),
    addLineItems: jest.fn(),
    clearLineItems: jest.fn(),
    addVariants: jest.fn(),
    removeLineItems: jest.fn(),
    updateLineItem: jest.fn(),
  },
  shop: {},
  image: {},
  fetchNextPage: jest.fn(),
};
