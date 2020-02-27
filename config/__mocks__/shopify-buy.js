const shopifyBuy = jest.requireActual('shopify-buy');

// const MOCK_CLIENT = {
//   product: {},
//   collection: {},
//   checkout: {
//     create: jest.fn(),
//     fetch: jest.fn(),
//     addLineItems: jest.fn(),
//     clearLineItems: jest.fn(),
//     addVariants: jest.fn(),
//     removeLineItems: jest.fn(),
//     updateLineItem: jest.fn(),
//   },
//   shop: {},
//   image: {},
//   fetchNextPage: jest.fn(),
// };

// shopifyBuy.buildClient = ({storefrontAccessToken, domain}) => {
//   if (storefrontAccessToken == null) {
//     throw new Error('new Config() requires the option storefrontAccessToken');
//   }

//   if (domain == null) {
//     throw new Error('new Config() requires the option domain');
//   }

//   return MOCK_CLIENT;
// };

export default shopifyBuy;
