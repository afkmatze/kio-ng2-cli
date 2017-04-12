"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("../env/constants");
var cmd_indexes = require("./indexes");
var cmd_component = require("./component");
var path = require("path");
var console_1 = require("../console");
var yargs = require("yargs");
exports.BUILD_INDEXES = "indexes";
exports.CREATE_COMPONENT = "component";
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
    var argv = yargs
        .usage('Usage: $0 <command>')
        .command(cmd_component.yargs)
        .command(cmd_indexes.yargs)
        .demand(1)
        .help()
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