if (process.env.NODE_ENV === 'dev') {
  module.exports = require('./store.dev');
} else {
  module.exports = require('./store.prod');
}