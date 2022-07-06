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
      ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development' && 'http://localhost:3000/api'
     
    },
    images: {
      domains: ['images.unsplash.com','caret.cloud', 'apogolypse.mypinata.cloud', 'stripe-camo.global.ssl.fastly.net'],
	},
  };
