#!/usr/bin/env node

const textNullVal = "_!.NULL.!_";
const args = require('args-parser')(process.argv);
const vLog = require('../src/index.js');


var message = (typeof args.msg === "undefined") ? textNullVal : (`${args.msg}`);
var type = (typeof args.type === "undefined") ? ((message !== textNullVal) ? "info" : "warn") : (`${args.type}`);


if (typeof args.selftest !== "undefined") {
  if (isNaN(args.selftest) || typeof args.selftest === "boolean") {
    args.selftest = 10;
  }


  for (let i = 0; i < args.selftest; i++) {
    vLog.msg(vLog.generate.randomMessage(), vLog.generate.randomType());
  }

} else {

  vLog.msg(message, type);
}
