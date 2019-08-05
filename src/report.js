const request = require('request');
const report = require('./bnbfunc.js');
var urL = "http://jvers.com/csci-ua.0480-fall2017-003/homework/02/086e27c89913c5c2dde62b6cdd5a27d2.json";
var cnt = 10;
function call(url){
  var next_url;
  request(url, function(error, response, body){
    let stringArr = body.split("\n");
    console.log(stringArr.pop() + "haha");
    let listings = stringArr.map(x => JSON.parse(x));
    let this_url = url.split("/");
    this_url[this_url.length - 1] = listings.pop().nextFile;
    console.log(report.processAirBnbData(listings));
    let new_url = this_url.join("/");
    console.log(new_url);
    cnt--;
    if(cnt > 0){
      call(new_url);
    }
  });
}
call(urL);

// request(url, function(error, response, body){
// let stringArr = body.split("\n");
// let next_url = stringArr.pop();
// let listings = stringArr.map(x => JSON.parse(x));
// console.log(report.processAirBnbData(listings));
// });
