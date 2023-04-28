/* eslint-disable */
const blacklist = require('metro-config/src/defaults/exclusionlist');
module.exports = {
  resolver: {
    blacklistRE: blacklist([/#current-cloud-backend\/.*/])
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  }
};
