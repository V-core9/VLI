#!/usr/bin / env node


console.time("vLog_EXEC_TIME_ALL")

const vLog = require('../lib/index.js');
const args = require('args-parser')(process.argv);

var message = "";
message += (typeof args.msg === "undefined") ? "" : (`${args.msg}`);
message += (typeof args.message !== "undefined") ? (`${args.message}`) : "";
console.log(JSON.stringify(args))
var type = "log";
type = (typeof args.type === "undefined") ? "log" : (`${args.type}`);


if (typeof args.selftest !== "undefined") {
  var testNumber = (args.selftest > 1) ? args.selftest : 10;

  console.time("LOOP EXEC TIME")
  if (message == "") message = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
  
  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`;
  for (let i = 0; i < testNumber; i++) {
    var type = (i % 2 === 0) ? ((i % 4 === 0) ? "log" : "info") : ((i % 5 === 0) ? "warn" : "error");
    vLog.msg(message, type);
  }
  console.timeEnd("LOOP EXEC TIME")
} else {

  vLog.msg(message, type);
}
