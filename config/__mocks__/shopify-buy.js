const shopifyBuy = jest.requireActual('shopify-buy');
const helpers = require('../../gatsby-theme-shopify-core/src/utils/tests');

shopifyBuy.buildClient = ({storefrontAccessToken, domain}) => {
  if (storefrontAccessToken == null) {
    throw new Error('new Config() requires the option storefrontAccessToken');
  }

  if (domain == null) {
    throw new Error('new Config() requires the option domain');
  }

  return helpers.MOCK_CLIENT;
};

export default shopifyBuy;
