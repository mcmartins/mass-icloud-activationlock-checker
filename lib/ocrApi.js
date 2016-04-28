var requests = require('request');
var fs = require('fs');
var API_URL = 'https://api.ocr.space/parse/image';
var API_KEY = 'd12db14c7788957';

module.exports.resolveCaptcha = function resolveCaptcha(imageFileName, callback) {
    var payload = {
        'apikey': API_KEY,
        'file': fs.createReadStream(imageFileName)
    };

    requests.post({url: API_URL, formData: payload}, function (err, resp, body) {
        var json = JSON.parse(body);
        var string = json.ParsedResults[0].ParsedText;
        var captcha = string.trim().toUpperCase();
        return callback(err, captcha);
    });
};


module.exports.resolveCaptcha(__dirname + '/2.jpg', function(err, res) {
    console.log(res);
});