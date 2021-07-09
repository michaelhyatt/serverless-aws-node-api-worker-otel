'use strict';

const request = require('request');


module.exports.producer = (event, context, callback) => {

  console.log(`Event: ${JSON.stringify(event)}`)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,
    }),
  };

  callback(null, response);

};


module.exports.consumer = (event, context, callback) => {

  let options = {
    url: process.env.CONSUMER_API,
    headers: {}
  }

  request.get( options, (err, res, body) => {

    if (err) {
      return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);

    const response_final = {
      statusCode: 200,
      body: JSON.stringify({
        message: `The response from the producer is ${body}.`,
      }),
    };

    callback(null, response_final);

  });

};