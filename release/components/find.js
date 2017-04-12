"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = require("shelljs");
var path = require("path");
var constants_1 = require("../env/constants");
var create_1 = require("./create");
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
    return shelljs_1.find(searchRoot).filter(function (item) {
        return !path.extname(item)
            && !/^\./.test(path.basename(item))
            && !/txt|src|fragment/.test(path.basename(item))
            && path.basename(item) !== path.basename(constants_1.KIO_PATHS.components.publication)
            && path.basename(item) !== path.basename(constants_1.KIO_PATHS.components.structure);
    }).map(create_1.createWithPath);
};
//# sourceMappingURL=find.js.map