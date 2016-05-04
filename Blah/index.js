var http = require('http');

module.exports = function(context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    
    if (req.query.number || (req.body && req.body.number)) {
        
        context.log('number found:' + (req.query.number || req.body.number) );

        var accountSid = process.env.AccountSid;
        var authToken = process.env.AuthToken;

        context.log('credentials: ' + accountSid + ':' + authToken);

//https://lookups.twilio.com/v1/PhoneNumbers/+15108675309/?Type=carrier&Type=caller-name

        var request = require('request');

        request('https://lookups.twilio.com/v1/PhoneNumbers/' + (req.query.number || req.body.number) + '/?Type=carrier&Type=caller-name', {
          'auth': {
            'user': process.env.AccountSid,
            'pass': process.env.AuthToken,
            'sendImmediately': true
          }},
          function (error, response, body) {

              console.log(error) // Show the HTML for the Google homepage. 
              console.log(response.statusCode) // Show the HTML for the Google homepage. 

              if (!error && response.statusCode == 200) {

                context.res = {
                    // status: 200, Defaults to 200 
                    body: body
                };
                context.done();

              }

        });


        context.log('shouldnt be here');
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a number on the query string or in the request body"
        };
        context.done();
    }

    context.log('shouldnt be here either');
};
