require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme Shopify Manager',
    description: `The easiest way to build a Shopify store on Gatsby.`,
    author: `@thetrevorharmon`,
    twitterHandle: `@thetrevorharmon`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-shopify-manager`,
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `hooks`,
        path: `${__dirname}/src/content/hooks/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `@horacioh/gatsby-theme-mdx`,
    },
    `gatsby-plugin-react-helmet`,
  ],
};
