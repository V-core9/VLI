
var faker = require('faker');
const { prompt } = require('enquirer');

const exitCommand = "<[_V_EXIT_]>";

//-> OBJECT Storing ARRAY of OBJECTS .... HOPEFULLY: In RAM/System Memory.
let vRAM = {
  //<_Data_> actual array of objects. 
  data: [],
  //>>---------------------

  //<_L_> Get number of items in there [ length(), numberOfItems() ] 
  length: async function () {
    try {
      console.log(this.data.length);
      return this.data.length;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  numberOfItems: async function () {
    return this.length();
  },
  //>>---------------------

  //<_C_> Create functionality [ newItem(), addItem(), makeItem() ] 
  newItem: async function (niName = null, niVal = null) {

    if ((niName === null) || (niVal === null)) {
      console.log("NULL -> {n==NUL||d==NUL} ");
      return false;
    }

    try {
      this.data.push({ name: niName, value: niVal });
      return true;
    } catch (err) {
      console.log("<_Vram::ERROR >>>----------------------------\n" + err);
      //console.trace();
      return err;
    }

  },
  addItem: async function (aiName = null, aiVal = null) {
    return this.newItem(aiName, aiVal);
  },
  makeItem: async function (miName = null, miVal = null) {
    return this.newItem(miName, miVal);
  },
  //>>---------------------

  //<_R_> Read data. [  ] 
  //<_U_> Update func. [  ] 

  //<_D_> Delete methods [ removeItem(), deleteItem(), rmItem() ] 
  removeItem: (riName = null) => {
    console.log("<_!_ WARNING: ENTERING DANGER ZONE! HAHA...JUST_NOT_READY_YET _!_>");
    console.log("NAME TO REMOVE: " + riName);
    return false;
  },
  deleteItem: (diName) => {
    return this.removeItem(diName);
  },
  rmItem: (rmiName) => {
    return this.removeItem(rmiName);
  }
};

const generateVariable = () => {
  try {
    if (faker.datatype.number(100) > 49) {
      vRAM.addItem(faker.name.findName(), faker.datatype.number());
    } else {
      vRAM.addItem(faker.name.findName(), faker.lorem.sentence());
    }
    return "generateVariable";
  } catch (err) {
    console.log(err);
    return err;
  }
}

const vliCommandList = [
  {
    cmd: "vram_view",
    args: [
      {
        name: "variableName",
        type: "string",
        value: "_ALL_"
      }
    ],
    exec: () => {
      console.log(this);
      console.log(vRAM.data);
      return this.cmd;
    }
  },
  {
    cmd: "vram_inum",
    exec: () => {
      console.log(this);
      console.log(vRAM.length());
      return this.cmd;
    }
  },
  {
    cmd: "help",
    exec: () => {
      console.log(this);
      console.log(vliCommandList);
      return this.cmd;
    }
  },
  {
    cmd: "generate_random_variable",
    args: [
      {
        name: "numberToGenerate",
        type: "number",
        value: 1
      }
    ],
    exec() {
      console.log("this");
      console.log(this);
      try {
        for (let i = 0; i < this.args[0].value; i++) {
          generateVariable();
        }

        return true;

      } catch (err) {
        console.log(err);
        return err;
      }
    }
  },
  {
    cmd: "exit",
    exec: () => {
      console.log(this);
      return exitCommand;
    }
  }
];

async function mainUserLoop() {

  var command = "NULL";
  var lastExec = "NULL";

  console.log("[|:|[> - V_CLI_Window <STARTING> ");

  while (lastExec !== exitCommand) {
    const response = await prompt({
      type: 'input',
      name: 'testPromptValue',
      message: '_$_VLI>>: '
    });

    console.log(response);


    command = response.testPromptValue.toLowerCase();

    console.log(command);

    var helpCmdArr = command.split(" "); //<[+ in case there is some space on line start  ]>>--------
    var ii = 0;
    while (helpCmdArr[ii] == "") {
      ii++;
    }
    command = helpCmdArr[ii];

    var args = "";

    console.log(helpCmdArr);

    vliCommandList.forEach((item) => {
      var hh = ii + 1;

      if (item.cmd === command) {

        if (typeof item.args !== 'undefined') {
          while (helpCmdArr[hh] == "") {
            hh++;
          }
          args = helpCmdArr[hh];
          console.log("ARGS :: " + args);
          if (typeof args !== 'undefined') item.args[0].value = args;
        }

        console.log(item.name);
        console.log("CMD_Found :: " + command + "\nExecuting...");
        lastExec = item.exec();
      }
    });

  }

  console.log("[|:|[> - V_CLI_Window <EXITING> ");

}

mainUserLoop();
