var accountSid = 'AC3137d76457814a5eabf7de62f346d39a';
var authToken = '3c2fbfbf668297ac4621b165534e55e6';

console.log('credentials: ' + accountSid + ':' + authToken);
/*
var LookupsClient = require('twilio').LookupsClient;
var client = new LookupsClient(accountSid, authToken);

client.phoneNumbers( '+17049951035' ).get({
    type: 'caller-name',
    //type: 'carrier',
    //type: ['carrier','caller-name'],
}, function(error, number) {

    console.log('request complete');            
    console.log(error);
    console.log(number);
});*/

var request = require('request');

request('https://lookups.twilio.com/v1/PhoneNumbers/+17327420431/?Type=carrier&Type=caller-name', {
  'auth': {
    'user': 'AC3137d76457814a5eabf7de62f346d39a',
    'pass': '[]',
    'sendImmediately': false
  }},
  function (error, response, body) {

      console.log(error) // Show the HTML for the Google homepage. 
      console.log(response.statusCode) // Show the HTML for the Google homepage. 

  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }

});

