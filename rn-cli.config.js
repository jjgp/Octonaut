const blacklist = require("metro-config/src/defaults/blacklist");

module.exports = {
  resolver: {
    blacklistRE: blacklist([
      /src\/common\/configuration.js.gpg/,
      /keyrings\/.*/
    ])
  }
};
