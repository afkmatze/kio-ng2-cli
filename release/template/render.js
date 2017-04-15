"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var writeFile = function (filename, data) { return new Promise(function (resolve, reject) {
    fs.writeFile(filename, data, { encoding: 'utf8' }, function (error) {
        error ? reject(error) : resolve();
    });
}); };
/*

const renderComponentIndex = ( ) => {
  const componentNames:string[] = []
  const singleImports = files.map ( fileComponent => {
    componentNames.push ( fileComponent.name+'Component' )
    return `import { ${fileComponent.name}Component } from './${path.relative(indexPath,fileComponent.dir)}/${fileComponent.dasherizedName}.component'`
  } )

  return `${singleImports.join('\n')}

export { ${componentNames.join(', ')} }
export const ${indexName} = [ ${componentNames.join(', ')} ]
  `
}

const renderFixtureIndex = ( indexPath:string, indexName:string , files:ComponentArg[] ) => {
  const componentNames:string[] = []
  const singleImports = files.map ( fileComponent => {
    componentNames.push ( fileComponent.name )
    return `import { Fixture as ${fileComponent.name} } from './${path.relative(indexPath,fileComponent.dir)}/${fileComponent.dasherizedName}.component.cquery.fixture'`
  } )

  return `${singleImports.join('\n')}

export { ${componentNames.join(', ')} }
  `
}

const renderCriteriaIndex = ( indexPath:string, indexName:string , files:ComponentArg[] ) => {
  const componentNames:string[] = []
  const singleImports = files.map ( fileComponent => {
    componentNames.push ( fileComponent.name )
    return `import { Criteria as ${fileComponent.name} } from './${path.relative(indexPath,fileComponent.dir)}/${fileComponent.dasherizedName}.component.cquery.fixture'`
  } )

  return `${singleImports.join('\n')}

export { ${componentNames.join(', ')} }
  `
}
*/ 
//# sourceMappingURL=render.js.map