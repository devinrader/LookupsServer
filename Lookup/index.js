var http = require('http');

module.exports = function(context, req) {
    context.log('Node.js HTTP trigger function processing a request. RequestUri=%s', req.originalUrl);

    if (req.query.number || (req.body && req.body.number)) {
        
        var accountSid = process.env.AccountSid;
        var authToken = process.env.AuthToken;

        var request = require('request');
        
        request('https://lookups.twilio.com/v1/PhoneNumbers/' + (req.query.number || req.body.number) + '/?Type=carrier&Type=caller-name', {
          'auth': {
            'user': process.env.AccountSid,
            'pass': process.env.AuthToken,
            'sendImmediately': true
          }},
          function (error, response, body) {

              context.log(error) 
              context.log(response.statusCode)

              if (!error && response.statusCode == 200) {

                context.res = {
                    // status: 200, Defaults to 200 
                    body: body
                };
                context.done();

              } else {
                context.res = {
                  status: 500,
                  body: error
                };
                context.done();
              }

        });

        context.log('Phone Number value found');
        //context.done();
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a number on the query string or in the request body"
        };
        context.done();
    }

    context.log('Function complete');
};
