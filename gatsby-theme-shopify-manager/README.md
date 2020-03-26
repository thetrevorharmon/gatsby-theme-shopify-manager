# gatsby-theme-shopify-manager

[![Netlify Status](https://api.netlify.com/api/v1/badges/a69b3855-3f3c-437f-bd8e-90567d58106a/deploy-status)](https://app.netlify.com/sites/gatsby-theme-shopify-manager/deploys)

## Quickstart guide

Install this with npm:

```bash
npm install gatsby-theme-shopify-manager
```

Or with yarn:

```bash
yarn add gatsby-theme-shopify-manager
```

Set up your `gatsby-config.js`:

```javascript
{
  resolve: `gatsby-theme-shopify-manager`,
  options: {
    shopName: `your-shop-name`,
    accessToken: `your-storefront-api-access-token`,
  },
},
```

Import a hook:

```javascript
import {useCart} from 'gatsby-theme-shopify-manager';
```

Start coding. 🚀

## Full documentation

The full docs are found at [https://gatsby-theme-shopify-manager.netlify.com/](https://gatsby-theme-shopify-manager.netlify.com/).

## Contributing

To contribute to this repo, pull the repo and ask for the appropriate `.env` values for the `/docs` site. Then to start the project, simply run `yarn start` at the project root.

To add a new version, run `yarn version` within the `gatsby-theme-shopify-manager` directory. Change the version number to the appropriate release number (major, minor, patch).

Once you've created a new version, run `git push --tags`. Then run `npm publish`.
