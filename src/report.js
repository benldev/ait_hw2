const request = require('request');
const report = require('./bnbfunc.js');
var url = "http://jvers.com/csci-ua.0480-fall2017-003/homework/02/086e27c89913c5c2dde62b6cdd5a27d2.json";

request(url, function(error, response, body){
  let stringArr = body.split("\n");
  let next_url = stringArr.pop();
  let listings = stringArr.map(x => JSON.parse(x));
  console.log(report.processAirBnbData(listings));
});
