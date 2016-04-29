var requests = require('request');
var async = require('async');
var fs = require('fs');
var API_URL = 'https://api.ocr.space/parse/image';
var API_KEY = 'd12db14c7788957';

module.exports.resolve = function resolve(imageFileName, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
    var results = [];
    async.each(
        [
            resolveCaptchaOCRSpace, resolveCaptchaVeryPDF,
            resolveCaptchaOnlineCode, resolveOCRConvert,
            resolveCaptchaFreeOCR
        ],
        function iter(func, next) {
            func(imageFileName, function cb(err, res) {
                results.push(res);
                return next(err);
            });
        },
        function cb(err) {
            var frequency = {}; // array of frequency.
            var max = 0; // holds the max frequency.
            var result; // holds the max frequency element.
            for (var v in results) {
                if (results[v]) {
                    frequency[results[v]] = (frequency[results[v]] || 0) + 1; // increment frequency.
                    if (frequency[results[v]] > max) { // is this frequency > max so far ?
                        max = frequency[results[v]]; // update max.
                        result = results[v]; // update result.
                    }
                }
            }
            return callback(err, result);
        });
};

function resolveCaptchaOCRSpace(imageFileName, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
    var payload = {
        'apikey': API_KEY,
        'file': fs.createReadStream(imageFileName)
    };

    requests.post({
        url: API_URL,
        formData: payload
    }, function(err, resp, body) {
        if (err) {
            return callback(err);
        }
        var json = JSON.parse(body);
        var string = json.ParsedResults[0].ParsedText;
        var captcha = string.trim().toUpperCase();
        return callback(err, captcha);
    });
}

function resolveCaptchaVeryPDF(imageFileName, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
    //http://www.verypdf.com/online/ocr-converter.php
    return callback();
}

function resolveCaptchaOnlineCode(imageFileName, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
    //http://www.online-code.net/ocr.html
    return callback();
}

function resolveOCRConvert(imageFileName, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
    //http://www.ocrconvert.com/download.php
    return callback();
}

function resolveCaptchaFreeOCR(imageFileName, callback) {
    callback = callback || function(err, res) {
        console.log(err || res);
    };
    //http://www.free-ocr.com/about.html
    return callback();
}

/*
module.exports.resolve(__dirname + '/../result.png', function(err, res) {
    console.log(err || res);
});
*/
