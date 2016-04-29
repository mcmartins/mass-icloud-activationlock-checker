var spooky = require('spooky');

module.exports.activationlock = function activationlock(imei, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
  return callback();
};