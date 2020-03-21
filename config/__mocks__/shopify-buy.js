import {Mocks} from '../../gatsby-theme-shopify-manager/src/mocks';
const shopifyBuy = jest.requireActual('shopify-buy');

shopifyBuy.buildClient = ({storefrontAccessToken, domain}) => {
  if (storefrontAccessToken == null) {
    throw new Error('new Config() requires the option storefrontAccessToken');
  }

  if (domain == null) {
    throw new Error('new Config() requires the option domain');
  }

  return Mocks.CLIENT;
};

export default shopifyBuy;
