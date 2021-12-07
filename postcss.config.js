const glob = require('glob');

module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          ...glob.sync('node_modules/antd/es/**/*.css', { noDir: true }),
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ['html', 'body'],
        extractors: [
          {
            extractor: (content) => content.match(/([a-zA-Z-]+)(?= {)/g) || [],
            extensions: ['css'],
          },
        ],
      },
    ],
  ],
};
