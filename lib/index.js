const config = require('./configs/main')
var boxen = require('boxen');
const chalk = require('chalk');

var profileExecTimes = (config.exec_times === true) ? () => { return true } : () => { return false };
const messagesTXT = {
  devBlock: "⛔ - ERROR : _CODE_BLOCK_IN_DEVELOPMENT_ - ⛔"
};

const sysMsg = {
  text: messagesTXT.devBlock,
  cliText: chalk.bold.bgRgb(100, 100, 100)('\n ' + messagesTXT.devBlock + ' \n')
}

const logSysMsg = (sysMsg) => {
  return console.log(sysMsg)
}

const systemMessages = {
  inDevBlock: {
    msg: {
      text: sysMsg.text,
      cli: sysMsg.cliText
    },
    logMsg: () => {
      return console.log(systemMessages.inDevBlock.msg.cli);
    }
  }
}

// HOW TO USE _____________________________________
// [ 1 ]>  systemMessages.inDevBlock.logMsg();
// |>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// [ 2 ]>  logSysMsg(sysMsg.cliText)
//------------------------------------------------------
var blockLog = (config.save_log === false && config.mode === "production");
const justReturn = () => {
  return blockLog;
}
/*
const logStyle = {
  log: (msg = "") => {
    return boxen(chalk.rgb(50, 150, 50)(msg), { title: chalk.bgRgb(50, 150, 50)(' 📑 Msg_UID : #112233778899 '), padding: { top: 0, left: 2, right: 1, bottom: 0 } })
  },
  info: (msg = "") => {
    return boxen(chalk.rgb(50, 150, 210)(msg), { title: chalk.bgRgb(10, 100, 200)(' 📑 Info_UID : #112233778899 '), padding: { top: 0, left: 2, right: 1, bottom: 0 } })
  },
  warn: (msg = "") => {
    return boxen(chalk.rgb(225, 100, 50)(msg), { title: chalk.bgRgb(225, 100, 50)(' 📑 Warning_UID : #112233778899 '), padding: { top: 0, left: 2, right: 2, bottom: 0 } });
  },
  error: (msg = "") => {
    return boxen(chalk.rgb(250, 50, 50)(msg), { title: chalk.bgRgb(180, 60, 60)(' 📑 Error_UID : #112233778899 '), padding: { top: 0, left: 2, right: 2, bottom: 0 } });
  }
}
*/
// Displays a string in the console
// @param {msg} String string to show in the console
// @param {type} String type to have written in
const vLog = {
  list: [],
  add(item) {
    return this.list.push(item);
  },
  msg(content = null, type = "log") {
    if (justReturn()) return;

    var exec = 0;
    if (profileExecTimes()) exec = performance.now();
    const logItem = {
      uid: Date.now(),
      ts: Date.now(),
      msg: (content !== null) ? content : "missing_log_message_content",
      type: type
    };

    if (exec > 0) {
      exec = performance.now() - exec;
      logItem.exec = exec;
    }

    if (config.save_log === true) {
      logSysMsg(sysMsg.cliText)
    }

    if (config.print_log === true) {
      this.printMessage(logItem);
    }

    return logItem;
  },

  log(msg, type = "log") {
    return this.msg(msg, type);
  },

  info(msg) {
    return this.msg(msg, "info");
  },

  warn(msg) {
    return this.msg(msg, "warn");
  },

  error(msg) {
    return this.msg(msg, "error");
  },

  printMessage(logItem) {
    var helper = Math.trunc(logItem.msg.length / config.length_limit);
    if (helper > 0) {
      for (let i = 1; i <= helper; i++) {
        var positionToCut = (i === 1) ? (config.length_limit * i - 2) : (config.length_limit * i);
        logItem.msg = [logItem.msg.slice(0, positionToCut), "\n", logItem.msg.slice(positionToCut)].join('');

      }
    }
    var styledMessage = `⌘  ${logItem.msg} \n⏰ ${logItem.ts}`;

    if (config.exec_times === true) styledMessage = `${styledMessage}\nExec: ${logItem.exec}`;

    switch (logItem.type) {
      case "log":
        styledMessage = boxen(chalk.rgb(50, 150, 50)(styledMessage), { title: chalk.bgRgb(50, 150, 50)(` ⟁ Msg_UID : ${logItem.uid} `), padding: { top: 0, left: 2, right: 2, bottom: 0 } });
        break;
      case "info":
        styledMessage = boxen(chalk.rgb(50, 150, 210)(styledMessage), { title: chalk.bgRgb(10, 100, 200)(` ⌆ Info_UID : ${logItem.uid} `), padding: { top: 0, left: 2, right: 2, bottom: 0 } });
        break;
      case "warn":
        styledMessage = boxen(chalk.rgb(225, 100, 50)(styledMessage), { title: chalk.bgRgb(225, 100, 50)(` ⌬ Warn_UID : ${logItem.uid} `), padding: { top: 0, left: 2, right: 2, bottom: 0 } });
        break;
      case "error":
        styledMessage = boxen(chalk.rgb(250, 50, 50)(styledMessage), { title: chalk.bgRgb(180, 60, 60)(` ⮽ Error_UID : ${logItem.uid} `), padding: { top: 0, left: 2, right: 2, bottom: 0 } });
        break;

      default:

        break;
    }

    console.log(styledMessage);
  }
}
module.exports = vLog;
