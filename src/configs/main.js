
const config = {
  mode: "development",
  print_log: true,
  save_log: false,
  exec_times: false,
  length_limit: 100,
  justReturn: null,

  init() {

    blockLog = (this.save_log === false && this.mode === "production");

    this.justReturn = () => {
      return blockLog;
    };

  }
};

config.init();

module.exports = config;
