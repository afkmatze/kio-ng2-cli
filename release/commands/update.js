"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var project = require("../project");
var kio_ng2_env_1 = require("kio-ng2-env");
var env_1 = require("../env");
var path = require("path");
var logger = require("../console");
var rxjs_1 = require("rxjs");
exports.updateProjectCommand = function () { return ({
    command: 'updateProject',
    aliases: ['update'],
    describe: 'Updates a new kio digitorial project',
    builder: function (argv) {
        return argv
            .usage('Usage: $0 <command> [options]')
            .options({
            target: {
                type: 'string',
                default: process.env.KIO_NG2_PROJECT || process.cwd(),
                describe: 'Project root'
            }
        });
    },
    handler: function (args) {
        var _a = args._, command = _a[0], projectName = _a[1];
        var target = args.target;
        var componentPath = project.pathForNamedComponent('fragment', 'bar');
        var targetFolder = path.join(env_1.resolveKioPath('publication'), componentPath);
        var pathToStructureComponents = path.relative(path.join(targetFolder), env_1.resolveKioPath('structure'));
        logger.log('Init env at "%s"', target);
        return kio_ng2_env_1.env(target)
            .flatMap(function (store) {
            return rxjs_1.Observable.from(store.get('components'))
                .flatMap(function (component) {
                if (project.namedComponentExists(component)) {
                    logger.log('Component "%s" already exists at %s', component.name, project.pathForNamedComponent(component.type, component.name));
                    return rxjs_1.Observable.empty();
                }
                else if (project.isNamedFragmentComponentStructure(component)) {
                    logger.log('Write FragmentComponent "%s" at %s', component.name, project.pathForNamedComponent(component.type, component.name));
                    var data = project.dataForNamedFragmentComponent(pathToStructureComponents, component);
                    return project.writeComponent(data, target).map(function (res) { return component; });
                }
                else {
                    logger.log('Write Component "%s" at %s', component.name, project.pathForNamedComponent(component.type, component.name));
                    var data = project.dataForNamedComponent(pathToStructureComponents, component);
                    return project.writeComponent(data, target).map(function (res) { return component; });
                }
            })
                .map(function (component) {
                logger.log('Wrote "%s"', component.name);
                return component;
            })
                .toArray()
                .flatMap(function (components) {
                return store.save().map(function () { return store; });
            });
        })
            .toPromise()
            .then(function (envStore) {
            //console.log('envStore',envStore)
            return envStore.get('components');
        })
            .catch(function (error) {
            console.log("Failed! " + error);
        });
    }
}); };
//# sourceMappingURL=update.js.map