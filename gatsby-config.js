module.exports = themeOptions => {
  return {
    plugins: [
      "gatsby-plugin-typescript",
      {
        resolve: `gatsby-source-shopify`,
        options: {
          shopName: themeOptions.shopName,
          accessToken: themeOptions.accessToken
        }
      }
    ]
  };
};
