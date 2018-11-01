const blacklist = require("metro-config/src/defaults/blacklist");

module.exports = {
  resolver: {
    blacklistRE: blacklist([/src\/configuration\/index.js.gpg/])
  }
};
