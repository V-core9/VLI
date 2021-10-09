#!/usr/bin/env node

const textNullVal = "_!.NULL.!_";
const args = require('args-parser')(process.argv);
const vLog = require('../src/index.js');

const commandList = {
  _commands: [
    {
      name: "hello",
      exec() {
        return vLog.warn("CMD : [ hello ]  >> YEAAAAAA HELLOOO");
      }
    },
    {
      name: "help",
      exec() {
        return vLog.log("CMD : [ help ]  >> HELP ME PLEASE");
      }
    },
    {
      name: "msg",
      exec() {
        return vLog.info("CMD : [ msg ]  >> Accept MSG ");
      }
    },
    {
      name: "bash",
      exec() {
        return vLog.info("CMD : [ bash ]  >> DO SOMETHING IN BASH");
      }
    },
    {
      name: "something_quite_bad",
      exec() {
        return vLog.error("CMD : [ something_quite_bad ]  >> DO SOMETHING SUUUPER BAD TO TRIGGER ");
      }
    },
  ],
  findByName(name = null) {
    var res = false;
    if (name === null) return false;
    this._commands.forEach(cmd => {
      if (cmd.name === name) {
        //vLog.info("FOUND COMMAND");
        res = cmd.exec;
      };
    });
    //if (res === false) vLog.warn("NOT FOUND COMMAND");
    return res;
  },
};
var commandToExec = null;


Object.keys(args).forEach(argEntry => {
  commandToExec = commandList.findByName(argEntry);
});

if (commandToExec !== false) {
  commandToExec();
}

var message = (typeof args.msg === "undefined") ? textNullVal : (`${args.msg}`);
var type = (typeof args.type === "undefined") ? ((message !== textNullVal) ? "info" : "warn") : (`${args.type}`);
var selftest = (typeof args.selftest !== "undefined") ? ((isNaN(args.selftest) || typeof args.selftest === "boolean") ? selftest = 10 : selftest = args.selftest) : false;

if (args.selftest !== false) {
  for (let i = 0; i < args.selftest; i++) {
    vLog.msg(vLog.generate.randomMessage(), vLog.generate.randomType());
  }
} else {

  vLog.msg(message, type);
}
