require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme Shopify Manager',
    description: `The easiest way to build a Shopify store on Gatsby.`,
    author: `@thetrevorharmon`,
    twitterHandle: `@thetrevorharmon`,
    siteUrl: 'https://gatsby-theme-shopify-manager.netlify.app',
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Theme Shopify Manager`,
        icon: 'src/assets/images/icon.png',
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
