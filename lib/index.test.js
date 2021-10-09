#!/usr/bin / env node
const vLog = require('./index.js');

var message = "TEST MESSAGE LOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIME";

vLog.log(message);
vLog.log(message, "log");
vLog.log(message, "info");
vLog.log(message, "warn");
vLog.log(message, "error");

vLog.info(message);
vLog.warn(message);
vLog.error(message);



vLog.msg(message,);
vLog.msg(message, "log");
vLog.msg(message, "info");
vLog.msg(message, "warn");
vLog.msg(message, "error");

console.time("LOOP EXEC TIME")
var message = "TEST MESSAGE LOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIMELOOP EXEC TIME";
for (let i = 0; i < 100; i++) {
  var type = (i % 2 === 0) ? ((i % 4 === 0) ? "log" : "info") : ((i % 5 === 0) ? "warn" : "error");
  vLog.msg(message, type );
}
console.timeEnd("LOOP EXEC TIME")

console.timeEnd("vLog.log(FIRST_VERSION)")
console.log("-<[ START OF SECOND PART ]>--------------------------------------")

console.time("vLog.log(message)");
vLog.log(message)
console.timeEnd("vLog.log(message)")

console.time("vLog.log(message, 'log')");
vLog.log(message, "log");
console.timeEnd("vLog.log(message, 'log')")

console.time("vLog.log(message, 'info')");
vLog.log(message, "info");
console.timeEnd("vLog.log(message, 'info')")

console.time("vLog.log(message, 'warn')");
vLog.log(message, "warn");
console.timeEnd("vLog.log(message, 'warn')")

console.time("vLog.log(message, 'error')");
vLog.log(message, "error");
console.timeEnd("vLog.log(message, 'error')")


console.time("vLog.info(message)");
vLog.info(message)
console.timeEnd("vLog.info(message)")
console.time("vLog.warn(message)");
vLog.warn(message)
console.timeEnd("vLog.warn(message)")
console.time("vLog.error(message)");
vLog.error(message);
console.timeEnd("vLog.error(message)")



console.time("vLog.msg(message)")
vLog.msg(message);
console.timeEnd("vLog.msg(message)")

console.time('vLog.msg(message, "log");')
vLog.msg(message, "log");
console.timeEnd('vLog.msg(message, "log");')

console.time('vLog.msg(message, "info")')
vLog.msg(message, "info")
console.timeEnd('vLog.msg(message, "info")')

console.time('vLog.msg(message, "warn");')
vLog.msg(message, "warn");
console.timeEnd('vLog.msg(message, "warn");');

console.time('vLog.msg(message, "error")')
vLog.msg(message, "error")
console.timeEnd('vLog.msg(message, "error")')

//console.log(vLog.list)
console.log("-<[ DONE ]>-----")

