import {CART} from './cart';

export const CLIENT = {
  product: {},
  collection: {},
  checkout: {
    create: jest.fn(() => CART),
    fetch: jest.fn(),
    addLineItems: jest.fn((cartId, items) => {
      return {...CART, lineItems: [...CART.lineItems, ...items]};
    }),
    clearLineItems: jest.fn(),
    addVariants: jest.fn(),
    removeLineItems: jest.fn((_, lineItemIds) => {
      const newLineItems = CART.lineItems
        .map((lineItem) => {
          if (lineItemIds.includes(lineItem.id)) {
            return null;
          }
          return lineItem;
        })
        .filter(Boolean);

      return {...CART, lineItems: newLineItems};
    }),
    updateLineItems: jest.fn((_, itemsToUpdate) => {
      const lineItems = CART.lineItems.map((lineItem) => {
        let newLineItem = lineItem;
        itemsToUpdate.forEach((item: {id: string; quantity: number}) => {
          if (item.id === lineItem.id) {
            newLineItem = {
              ...lineItem,
              quantity: item.quantity,
            };
          }
        });

        return newLineItem;
      });

      return {...CART, lineItems: lineItems};
    }),
  },
  shop: {},
  image: {},
  fetchNextPage: jest.fn(),
};
