#!/usr/bin/env node

const textNullVal = "_!.NULL.!_";
const args = require('args-parser')(process.argv);
const vLog = require('../src/index.js');


var message = (typeof args.msg === "undefined") ? textNullVal : (`${args.msg}`);
var type = (typeof args.type === "undefined") ? ((message !== textNullVal) ? "info" : "warn") : (`${args.type}`);





if (typeof args.selftest !== "undefined") {
  var testNumber = (args.selftest > 1) ? args.selftest : 10;

  console.time("LOOP EXEC TIME")
  if (message == "") message = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
  
  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`;
  for (let i = 0; i < testNumber; i++) {
    vLog.msg(vLog.generate.randomMessage(), vLog.generate.randomType());
  }
  console.timeEnd("LOOP EXEC TIME")
} else {

  vLog.msg(message, type);
}
