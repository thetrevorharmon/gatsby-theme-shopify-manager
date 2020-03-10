import {CART} from './cart';

export const CLIENT = {
  product: {},
  collection: {},
  checkout: {
    create: jest.fn(() => CART),
    fetch: jest.fn(),
    addLineItems: jest.fn((cartId, items) => {
      if (items.length < 1) {
        throw new Error(
          'Must include at least one line item, empty line items found',
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items.forEach((item: any) => {
        if (item.variantId == null) {
          throw new Error(`Missing variantId in item`);
        }

        if (item.quantity == null) {
          throw new Error(
            `Missing quantity in item with variant id ${item.variantId}`,
          );
        } else if (typeof item.quantity != 'number') {
          throw new Error(
            `Quantity is not a number in item with variant id ${item.variantId}`,
          );
        } else if (item.quantity < 1) {
          throw new Error(
            `Quantity must not be less than one in item with variant id ${item.variantId}`,
          );
        }
      });

      return {...CART, lineItems: [...CART.lineItems, ...items]};
    }),
    clearLineItems: jest.fn(),
    addVariants: jest.fn(),
    removeLineItems: jest.fn(),
    updateLineItems: jest.fn((cartId, itemsToUpdate) => {
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
