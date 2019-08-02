const fs = require('fs');
function sum(num1, num2, ... numn){
  let s = 0;
  if(num1 !== undefined) {s += num1;}
  if(num2 !== undefined) {s += num2;}
  if(numn.length !== 0){
    s += numn.reduce((accu, value) => {return accu + value;}, 0);
  }
  return s;
}

function repeatCall(fn, n, arg){
  [...new Array(n)].map(() => {fn(arg);});
}

function repeatCallAllArgs(fn, n, ...argsn){
 [...new Array(n)].map(() => {fn(...argsn);});
}

function makePropertyCheck(prop){
  return function(obj){ return obj[prop] !== undefined};
}

function constrainDecorator(fn, min, max){
  return function(...arg){
    let ret = fn(...arguments);
    if(ret < min) {return min;}
    if(ret > max) {return max;}
    return ret;
  }
}

function limitCallsDecorator(fn, n){
  let cnt = 0;
  return function(){
    if(cnt < n) {cnt++; return fn.apply(null, arguments);}
    else {return undefined;}
  }
}

function mapWith(fn){
  return function(arr){
    return arr.map(fn);
  }
}

function simpleINIParse(s){
  return s.split("\n").map((ss) => ss.split("=")).filter((arr) => {return arr.length === 2}).reduce(function(obj, arr){obj[arr[0]] = arr[1]; return obj;}, {});
}

function readFileWith(fn){
  return function(file, f){
    fs.readFile(file, 'utf8', (err, data) => {
      f(err, (err === null || err === undefined)? fn(data) : undefined);
    });
  }
}

function maybe(f){
  return function(){
    let flag = false;
    [...arguments].filter((arg) => {if(arg === null || arg === undefined){flag = true;} return true;});
    if(flag) return undefined;
    return f(...arguments);
  }
}

function filterWith(f){
  return function(arr){
   return arr.filter((e) => f(e));
  }
}
module.exports = {
  sum: sum,
  repeatCall: repeatCall,
  repeatCallAllArgs: repeatCallAllArgs,
  makePropertyCheck: makePropertyCheck,
  constrainDecorator: constrainDecorator,
  limitCallsDecorator: limitCallsDecorator,
  mapWith: mapWith,
  simpleINIParse: simpleINIParse,
  readFileWith: readFileWith,
  maybe: maybe,
  filterWith: filterWith
};
