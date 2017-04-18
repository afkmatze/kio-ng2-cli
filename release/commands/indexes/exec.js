"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var components_1 = require("../../components");
var interfaces_1 = require("../../indexes/interfaces");
var componentSource = require("../../components/source");
var templates_1 = require("../../templates");
var logger = require("../../console");
var rxfs = require("../../utils/rx/fs");
var stringUtils = require("../../utils/string");
var env_1 = require("../../env");
var templateCreate = require("../../templates/types/index/create");
var templateRender = require("../../templates/types/index/render");
//import * as templateFiles from '../../templates/files'
var log = function (txt) {
    console.log(txt);
};
var logMap = function (value, idx) {
    console.log('value %s\n---\n', idx, value, '\n---');
    return value;
};
var indexTypeFilter = function (typeName) {
    if (/publication|fixture|criteria/.test(typeName)) {
        return function (component) { return component instanceof components_1.PublicationComponent; };
    }
    if (typeName === 'structure') {
        return function (component) { return components_1.KioComponentType[component.typeName] === components_1.KioComponentType.StructureComponent; };
    }
    if (typeName === 'navigation') {
        return function (component) { return components_1.KioComponentType[component.typeName] === components_1.KioComponentType.NavigationComponent; };
    }
    return function () { return false; };
};
var applyFilter = function (filter) {
    if (filter === void 0) { filter = []; }
    if (filter && !Array.isArray(filter))
        filter = [filter];
    return function (component, idx) {
        if (filter.length === 0 || !filter) {
            return true;
        }
        else if (component instanceof components_1.PublicationComponent) {
            return !!Array.from(filter).find(function (key) { return /publication|fixture|criteria/.test(key); });
        }
        else if (components_1.KioComponentType[component.typeName] === components_1.KioComponentType.StructureComponent) {
            var filterIndex = Array.from(filter).indexOf('structure');
            //console.log('filter index of "%s"', 'structure', filterIndex)
            return filterIndex > -1;
        }
        else if (components_1.KioComponentType[component.typeName] === components_1.KioComponentType.NavigationComponent) {
            var filterIndex = Array.from(filter).indexOf('navigation');
            //console.log('filter index of "%s"', 'navigation', filterIndex)
            return filterIndex > -1;
        }
        return false;
    };
};
var mapComponentToIndexItem = function (indexType, component) {
    var indexName = interfaces_1.IndexType[indexType];
    var rootPath = env_1.path.join(env_1.KIO_PATHS.root);
    var importAlias = mapImportAlias[indexName] || '';
    var suffix = importAlias ? '.' + indexName : '';
    return {
        importName: component.name + (!importAlias ? 'Component' : ''),
        importPath: './' + env_1.path.join(component.relativeFrom(env_1.KIO_PATHS.root), component.dasherizedName + '.component' + suffix),
        importAlias: importAlias
    };
};
var mapExportNames = {
    "fixture": "PublicationFixtures",
    "criteria": "PublicationCriterias",
    "publication": "PublicationComponents",
    "navigation": "NavigationComponents",
    "structure": "StructureComponents"
};
var mapImportAlias = {
    "fixture": "Fixture",
    "criteria": "Criteria"
};
/*
export const createIndexSource = ( indexType:IndexType, components:ComponentModel[] ) => {
  const indexName = IndexType[indexType]
  return templateRender.renderFilesIndex({
    exportName: mapExportNames[indexName],
    indexItems: components.map ( component => {
      return mapComponentToIndexItem ( indexType, component )
    } )
  }).map ( source => ({
      name: IndexType[indexType],
      source
    } )
  )
}*/
exports.createIndexTemplateData = function (indexType, components) {
    var indexName = interfaces_1.IndexType[indexType];
    var templateData = {
        exportName: mapExportNames[indexName],
        indexItems: components.map(function (component) { return mapComponentToIndexItem(indexType, component); })
    };
    return templateData;
};
exports.writeComponentsToIndexTemplate = function (indexType, components) {
    var indexName = interfaces_1.IndexType[indexType];
    if (!Array.isArray(components)) {
        return components.toArray().flatMap(function (componentsList) { return exports.writeComponentsToIndexTemplate(indexType, componentsList); });
    }
    var source = templates_1.templateFiles("index", function (file) {
        var filename = mapExportNames[indexName] + ".generated.ts";
        return {
            filename: filename,
            absoluteFilepath: env_1.path.join(env_1.KIO_PATHS.root, filename),
            source: file.source
        };
    }).catch(function (error) {
        logger.logError(error, false);
        return rxjs_1.Observable.throw(error);
    });
    var templateData = exports.createIndexTemplateData(indexType, components);
    return source.flatMap(function (templateFile) {
        logger.debug('write template \x1b[1m%s\x1b[0m at %s', indexName, templateFile.absoluteFilepath);
        ///logger.debug('%s components', components)
        //logger.keys(components,"*")
        return templateRender.renderTemplateFileWithData(templateFile, templateData)
            .flatMap(function (content) { return rxfs.writeFile(templateFile.absoluteFilepath, content); });
    });
};
var defaultConfig = {
    filter: ["publication", "navigation", "structure", "fixture", "criteria"],
    noCache: false
};
exports.findUncachedComponents = function () {
    return rxjs_1.Observable.concat(['publication', 'structure', 'navigation'])
        .flatMap(function (componentType) {
        return rxjs_1.Observable.concat(componentSource.tsc.scan(componentType).map(function (files) { return files.map(function (file) { return env_1.path.basename(file); }); }), componentSource.cache.scan(componentType).map(function (files) { return files.map(function (file) { return stringUtils.dasherize(file.replace('.json', '')); }); }))
            .toArray()
            .map(function (_a) {
            var tscResults = _a[0], cacheResults = _a[1];
            console.log('tsc result', tscResults);
            console.log('cache result', cacheResults);
            return tscResults.filter(function (tscFile) {
                return cacheResults.indexOf(tscFile) === -1;
            });
        })
            .map(function (files) {
            console.log('uncached %s files', componentType, files);
            return files;
        });
    });
};
exports.refreshSource = function () {
    return exports.findUncachedComponents();
    // return Observable.concat(['publication','structure','navigation'])
    //   .flatMap ( componentType => {
    //     logger.log('read "%s"', componentType)
    //     return Observable.merge(
    //       componentSource.tsc.scan (componentType).map ( result => ({
    //         source: 'tsc',
    //         files: result
    //       }) ) ,
    //       componentSource.cache.scan ( componentType ).map ( result => ({
    //         source: 'cache',
    //         files: result
    //       }) ) ,
    //     ).toArray().map ( (items,idx) => {
    //       //console.log( '%s = %s -> %s items', componentType,idx, items.length )
    //       return {
    //         componentType,
    //         items
    //       }
    //     } )
    //   } )
    //   .map ( result => {
    //     console.log ( '%s: ', result.componentType, result.items )
    //     return result
    //   } )
};
exports.selectSource = function (cached) {
    if (cached === void 0) { cached = true; }
    if (cached === false || !componentSource.cache.exists('components')) {
        logger.log('cache not existing');
        return componentSource.tsc.fetch().flatMap(function (component) {
            return componentSource.cache.write(component).map(function (filename) { return component; });
        });
    }
    return componentSource.cache.fetch();
};
exports.default = function (config) {
    if (config === void 0) { config = defaultConfig; }
    var filter = config.filter || defaultConfig.filter;
    if (filter && !Array.isArray(filter))
        filter = [filter];
    var indexTemplate = templateCreate.createTemplateByName("index");
    indexTemplate.source = templateCreate.createTemplateSource("index");
    /*
      const filters = Observable.from(filter,Scheduler.async).flatMap(val => {
        console.log('select ', val , 'of', filter)
        return selectSource().filter(applyFilter(val))
      })
    */
    return exports.refreshSource().toArray().flatMap(function (list) {
        console.log('refreshed source', list);
        return rxjs_1.Observable.from(filter, rxjs_1.Scheduler.asap)
            .flatMap(function (filter) {
            //logger.log('find components for filter "%s"', filter )
            return exports.selectSource().filter(applyFilter(filter)).toArray()
                .map(function (components) {
                return {
                    filter: filter,
                    components: components
                };
            });
        }, 1)
            .concatMap(function (result) {
            //logger.log('%s-filtered components: %s', result.filter, result.components)
            return exports.writeComponentsToIndexTemplate(interfaces_1.IndexType[result.filter], result.components).map(function (filename) {
                return filename;
            });
        });
    });
    //const cb = selectSource(!config.noCache).filter(applyFilter(filter))
    /*
      const filters = Observable.from(filter).mergeMap((indexName:IndexName,idx) => {
        const indexType = IndexType[indexName]
        return selectSource(!config.noCache).filter(applyFilter(indexName)).toArray()
                .concatMap(components => {
                  logger.log('%s-filtered components: %s', indexName, components)
                  return writeComponentsToIndexTemplate(indexType,components).map (
                    ( filename ) => {
                      return filename
                    }
                  )
                })
      })
      .catch( error => {
        logger.logError(error,false)
        return Observable.throw(error)
      })
    
      return filters.toArray()
    */
};
//# sourceMappingURL=exec.js.map