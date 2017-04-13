"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = require("shelljs");
var path = require("path");
var constants_1 = require("../env/constants");
var create_1 = require("./create");
var filterFiles = function (file) {
    //console.log('\x1b[33m%s\x1b[0m', file)
    if (path.extname(file)) {
        //console.log('extension on', file)
        return false;
    }
    if (/^\./.test(path.basename(file))) {
        //console.log('basename starts with "."')
        return false;
    }
    if (/^(txt|src|fragment)$/.test(path.basename(file))) {
        //console.log('its a txt,src,fragment folder')
        return false;
    }
    if (path.basename(file) === path.basename(constants_1.KIO_PATHS.components.publication)) {
        //console.log('is publication components folder')
        return false;
    }
    if (path.basename(file) === path.basename(constants_1.KIO_PATHS.components.structure)) {
        //console.log('is structure components folder')
        return false;
    }
    return true;
};
exports.findComponents = function (filter) {
    var searchRoot = constants_1.KIO_PATHS.components[filter] || constants_1.KIO_PATHS.root;
    /*if ( isKioComponentType(filter) )
    {
      searchRoot = filter === KioComponentType.PublicationComponent ? KIO_PATHS.components.publication : KIO_PATHS.components.structure
    }
    else if ( isKioContentType(filter) )
    {
      searchRoot = path.join(KIO_PATHS.components.publication,<string>filter)
    }
  */
    //console.log('filter searchRoot', searchRoot)
    var allFiles = shelljs_1.find(searchRoot).filter(filterFiles);
    if (process.env.NODE_ENV === 'debug') {
        console.log('search root:', searchRoot);
        console.log(allFiles);
    }
    return allFiles.map(create_1.createWithPath);
};
//# sourceMappingURL=find.js.map