var async = require('async');
var iCloud = require('./lib/iCloudApi');

module.exports.handle = function handle(list, response, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
    async.each(
        list,
        function iter(imei, next) {
            iCloud.activationlock(imei, function(err, res) {
                response.write("IMEI %s: %s".format(imei, err || res));
                // do not pass the error, as it will stop the loop
                return next();
            });
        },
        function cb(err) {
            return callback(err);
        }
    );
};
