/** @type {import('next').NextConfig} */

// next.config.ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require('next-compose-plugins');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLess = require('next-with-less');

const plugins = [
  /* ...other plugins... */
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#00ccb4',
            'border-radius-base': '4px',
          },
        },
      },
    },
  ],
  /* ...other plugins... */
];

module.exports = withPlugins(plugins, {
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com'],
  },
});
