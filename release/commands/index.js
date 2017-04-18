"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var env = require("../env/constants");
var cmd_indexes = require("./indexes");
var cmd_component = require("./component");
var path = require("path");
var console_1 = require("../console");
var logger = require("../console");
var exec_1 = require("./indexes/exec");
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
    var all_filter = ['publication', 'navigation', 'structure'];
    var argv = yargs
        .usage('Usage: $0 <command> [options]')
        .options('config-file', {
        type: 'string',
        description: 'cli config file',
        default: path.resolve('kio-ng2.config.json')
    })
        .command(cmd_component.yargs)
        .command(cmd_indexes.yargs)
        .command("ls", "List components", function (argv) {
        return argv.options({
            filter: {
                alias: 'f',
                type: 'array',
                choices: all_filter,
                default: all_filter
            }
        });
    }, function (args) {
        args.filter = args.filter || all_filter;
        var filter = args.filter.length > 0 ? args.filter : all_filter;
        var indexSourceStream = exec_1.selectSource(!args.noCache);
        var obs = rxjs_1.Observable.concat(filter).flatMap(function (filterValue) {
            return indexSourceStream.filter(function (component) { return component.typeName.toLowerCase().indexOf(filterValue) > -1; }).toArray().map(function (components) {
                logger.log('%s %s components', components.length, filterValue);
                components.forEach(function (component, idx) { return logger.log('[component:%s/%s]: %s', idx + 1, components.length, component); });
                return {
                    filter: filter,
                    components: components
                };
            });
        });
        return obs.toPromise();
    })
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