module.exports = function(context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    
    if (req.query.number || (req.body && req.body.number)) {
        
        context.log('number found:' + (req.query.number || req.body.number) );

        var accountSid = process.env.AccountSid;
        var authToken = process.env.AuthToken;

        context.log('credentials: ' + accountSid + ':' + authToken);

        var LookupsClient = require('twilio').LookupsClient;
        var client = new LookupsClient(accountSid, authToken);

        client.phoneNumbers( (req.query.number || req.body.number) ).get({
            type: ['carrier','caller-name'],
            }, function(error, number) {
                context.log(number.carrier.type);
                context.log(number.carrier.name);

                context.res = {
                    // status: 200, Defaults to 200 
                    body: number
                };
                context.done();
        });
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a number on the query string or in the request body"
        };
        context.done();
    }
};