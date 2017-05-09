"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env");
var path = require("path");
var console_1 = require("../console");
var yargs = require("yargs");
exports.BUILD_INDEXES = "indexes";
exports.CREATE_COMPONENT = "component";
/** CREATE COMPONENT */
var createComponent_1 = require("./createComponent");
var buildIndexes_1 = require("./buildIndexes");
var testComponents_1 = require("./testComponents");
exports.exec = function (command) {
    console_1.banner();
    if (!env.KIO_PROJECT_ROOT || path.basename(env.KIO_PROJECT_ROOT) === 'kio-ng2-cli') {
        console_1.logError(Error("kio-ng2-cli must be run as an installed module."));
    }
    if (!env.KIO_PROJECT_PACKAGE || !env.KIO_PROJECT_PACKAGE.kio) {
        console_1.logError(Error("package.json is missing config at prop 'kio'"));
    }
    /*
      if(!command) {
        logError(Error("Command required."))
      }*/
    var all_filter = ['publication', 'navigation', 'structure'];
    var argv = yargs
        .usage('Usage: $0 <command> [options]')
        .options('config-file', {
        type: 'string',
        description: 'cli config file',
        default: path.resolve('kio-ng2.config.json')
    })
        .command(createComponent_1.createComponentCommand)
        .command(testComponents_1.testComponentsCommand)
        .command(buildIndexes_1.buildIndexesCommand)
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