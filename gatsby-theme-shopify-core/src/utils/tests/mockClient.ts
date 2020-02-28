import {MOCK_CART} from './mockCart';

export const MOCK_CLIENT = {
  product: {},
  collection: {},
  checkout: {
    create: jest.fn(() => MOCK_CART),
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
