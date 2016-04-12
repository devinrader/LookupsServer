module.exports = function(context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    
    if (req.query.number || (req.body && req.body.number)) {
        
        var accountSid = 'AC3094732a3c49700934481addd5ce1659';
        var authToken = '{{ auth_token }}';

        var LookupsClient = require('twilio').LookupsClient;
        var client = new LookupsClient(accountSid, authToken);

        client.phoneNumbers( (req.query.number || req.body.number) ).get({
            type: 'carrier'
            }, function(error, number) {
                console.log(number.carrier.type);
                console.log(number.carrier.name);

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