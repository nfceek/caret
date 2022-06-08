const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = {   
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { 
          fs: false,
          child_process: false
        };
  
      return config;
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : 'http://localhost:3000/api'
    },
    images: {
      domains: ['apogolypse.mypinata.cloud'],
    }
  };
