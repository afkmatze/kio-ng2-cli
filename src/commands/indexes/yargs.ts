import { KioContentType } from 'kio-ng2'
import { CommandModule } from 'yargs'
import * as fs from 'fs'
import { KioComponentType, KioComponent, KioStructureComponent, KioPublicationComponent } from '../../interfaces/kio-component'
import { logError, log } from '../../console'
import * as path from 'path'
import * as env from '../../env/constants'
import * as stringUtils from '../../utils/string'

import { findComponents } from '../../components/find'
import { Component } from '../../components/Component.class'



const renderComponentIndex = ( indexPath:string, indexName:string , files:Component[] ) => {
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

const writeComponentsToIndex = ( indexPath:string, indexName:string, files:Component[] ) => {
  const indexFileName = path.join(indexPath,indexName+'.generated.ts')
  log('Write index for %s at "%s"' , indexName , indexFileName )
  fs.writeFileSync(indexFileName,renderComponentIndex(indexPath,indexName,files),{encoding: 'utf8'})
}

export const yargs:CommandModule = {
  command: 'buildIndexes',
  aliases: ['index'],
  describe: 'Updates index files in ' + env.KIO_PATHS.root,
  builder: ( argv ) => {
    return argv
      .usage('Usage: $0 index [publication|structure]')
      .option('filter',{
        alias: 'f',
        choices: ['publication','structure'],
        default: ['publication','structure'],
        demand: true
      })
  },  
  handler: (args:any) => {
    const [ command ] = args._
    
    args.filter.forEach ( filterValue => {
      const files = findComponents(filterValue)
      writeComponentsToIndex(path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.root),stringUtils.classify(filterValue+'Components'),files)
    } )
    //console.log('files',args)
  }
}