'use strict';
const https = require('https');

module.exports.producer = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,
    }),
  };

  callback(null, response);
};

module.exports.consumer = (event, context, callback) => {

  let data = '';

  https.get( process.env.CONSUMER_API, (response) => {
  
    // called when a data chunk is received.
    response.on('data', (chunk) => {
      data += chunk;
    });
  
    // called when the complete response is received.
    response.on('end', () => {
      console.log(data);

      const response_final = {
        statusCode: 200,
        body: JSON.stringify({
          message: `The response from the provider is ${data}.`,
        }),
      };
      callback(null, response_final);
    });
  
  }).on("error", (error) => {
    console.log("Error: " + error.message);
  });

};