var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');
var shortid = require('shortid');
var command = 'convert %s -fill white -fuzz 10% +opaque "#000000" %s';

// initialize short id valid characters for filenames
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$');

module.exports.convert = function convert(base64ImageData, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
    decodeBase64Image(base64ImageData, function(err, res) {
        if (err) {
            return callback(err);
        }
        
        var originalImage = '/tmp/o-' + shortid.generate() + '.jpg';
        var convertedImage = '/tmp/c-' + shortid.generate() + '.jpg';

        fs.writeFile(originalImage, res.data, function(err) {
            if (err) {
                return callback(err);
            }
            exec(util.format(command, originalImage, convertedImage), function(err, stdout, stderr) {
                return callback(err, convertedImage);
            });
        });
    });
};

function decodeBase64Image(dataString, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };

    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};

    if (matches.length !== 3) {
        return callback(new Error('Invalid input string'));
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return callback(undefined. response);
}

/*
module.exports.convert('data:image/jpeg;base64,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', function(err, img) {
    console.log(err, img);
    var api = require('./ocrApi');
    api.resolveCaptcha(img, function(err, res) {
        console.log(err || res);
    });
});
*/
