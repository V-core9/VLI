#!/usr/bin/env node



const vLog = require('../src/index.js');
const commandLineArgs = require('command-line-args')

/* first - parse the main command */
const mainDefinitions = [
  { name: 'command', defaultOption: true }
]
const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })

console.log('COMMAND\n===========')
console.log(mainOptions.command)






const commandList = {
  _commands: [
    {
      name: "hello",
      disabled: false,
      exec() {
        return vLog.warn("CMD : [ hello ]  >> YEAAAAAA HELLOOO");
      }
    },
    {
      name: "help",
      disabled: false,
      exec() {
        return vLog.log("CMD : [ help ]  >> HELP ME PLEASE ::: NOOOOOOOOOOOO!!!!!!!!!");
      }
    },
    {
      name: "msg",
      disabled: false,
      exec() {
        return vLog.info("CMD : [ msg ]  >> Accept MSG ");
      }
    },
    {
      name: "bash",
      disabled: false,
      exec() {
        return vLog.info("CMD : [ bash ]  >> DO SOMETHING IN BASH");
      }
    },
    {
      name: "something_quite_bad",
      disabled: false,
      exec() {
        return vLog.error("CMD : [ something_quite_bad ]  >> DO SOMETHING SUUUPER BAD TO TRIGGER ");
      }
    },
    {
      name: "health_test",
      disabled: false,
      exec() {
        const argv = mainOptions._unknown || []
        console.log(mainOptions.repeatNumber);

        const mergeDefinitions = [
          { name: 'message', alias: 'm', type: String, multiple: true },
          { name: 'help', alias: "h", type: Boolean },
          { name: 'verbose', alias: 'v', type: Boolean },                                   // printing output to console ---
          { name: 'repeatNumber', alias: 'r', type: Number },                                   // health_test option -> generate few  <> accept number of generates to do
          { name: 'save_log', alias: 's', type: Boolean },                                       // output option -> to file <> to folder ...
        ]
        const mergeOptions = commandLineArgs(mergeDefinitions, { argv })


        for (let i = 0; i < mergeOptions.repeatNumber; i++) {
          vLog.msg(vLog.generate.randomMessage(), vLog.generate.randomType());
        }

        console.log('\nmergeOptions\n============')
        console.log(mergeOptions)

      }
    }
  ],
  findByName(name = null) {
    var res = false;
    if (name === null) return false;
    this._commands.forEach(cmd => {
      if (cmd.name.toLowerCase() === name.toLowerCase()) {
        vLog.info("FOUND COMMAND [ " + cmd.name + " ] ");
        res = cmd.exec;
      };
    });
    //if (res === false) vLog.warn("NOT FOUND COMMAND");
    return res;
  },
};

var commandToExec = false;
commandToExec = commandList.findByName(mainOptions.command);




if (commandToExec !== false) {
  //console.log(commandToExec);
  commandToExec();
} else {
  vLog.warn("v did not receive any data... <commandToExec> has not been provided. [ Response :|: Command_Trigger -> <help> ]");
  commandList.findByName("HELP")();
}

