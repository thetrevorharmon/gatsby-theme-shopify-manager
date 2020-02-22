require("dotenv").config({
  path: `.env`
});

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-shopify-core`,
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.ACCESS_TOKEN
      }
    }
  ]
};
