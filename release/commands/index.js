"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env");
var console_1 = require("../console");
var yargs = require("yargs");
exports.BUILD_INDEXES = "indexes";
exports.CREATE_COMPONENT = "component";
/** CREATE COMPONENT */
var createComponent_1 = require("./createComponent");
var buildIndexes_1 = require("./buildIndexes");
var testComponents_1 = require("./testComponents");
var createProject_1 = require("./createProject");
exports.exec = function (command) {
    console_1.banner();
    /*
      if(!command) {
        logError(Error("Command required."))
      }*/
    var all_filter = ['publication', 'navigation', 'structure'];
    var addCommands = function (yargv) {
        var isEnv = env.isProjectEnv();
        console.log('is env:', isEnv);
        if (isEnv) {
            return yargv
                .command(createComponent_1.createComponentCommand())
                .command(testComponents_1.testComponentsCommand())
                .command(buildIndexes_1.buildIndexesCommand());
        }
        else {
            return yargv
                .command(createProject_1.createProjectCommand());
        }
    };
    var argv = yargs
        .usage('Usage: $0 <command> [options]');
    addCommands(argv)
        .demand(1)
        .help('h')
        .argv;
    //console.log('argv', argv)
    /*switch (command) {
      case BUILD_INDEXES:
        return cmd_indexes.main ( env )
        break;
  
      case CREATE_COMPONENT:
        return cmd_component.main ( env )
        break;
      
      default:
        throw Error("Unknown command \"" + command + "\"")
        break;
    }*/
};
//# sourceMappingURL=index.js.map