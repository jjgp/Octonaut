/**
 * @prettier
 */

const blacklist = require("metro/src/blacklist");

module.exports = {
  getBlackListRE() {
    return blacklist([/middleware\/.*/]);
  }
};
