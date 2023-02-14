const request                                     = require('request');

exports.sendHttpRequest = sendHttpRequest;

function sendHttpRequest(options) {
    console.log("HTTP")
    // let options = opts.options;
    // console.log(opts.url)
    // console.log(options.url);
    return new Promise((resolve, reject) => {
    //   logging.log(apiReference, {HTTP_REQUEST: options});
  
      request(options, (error, response, body) => {
        if (error) {
            console.error(error, body, "error response from external server");
            return reject(error);
        }
        if (response == undefined) {
          error = new Error('No response from external server');
          return reject(error);
        }
        if (response.statusCode < '200' || response.statusCode > '299') {
          error = new Error('Couldn\'t request with external server ');
          error.body = response;
          error.code = response.statusCode;
          return reject(error);
        }
        console.log("No Error")
        return resolve(body);
      });
    });
  }