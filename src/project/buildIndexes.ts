import { Observable, Scheduler } from 'rxjs'
import * as path from 'path'
import { ExecData } from 'rxfs'
import { 
  Project, ProjectEnv,
  CLICommandArgs, CLICommandArgsBuildIndexes, CLICommandArgsTestComponents, CLICommandArgsCreateComponent,
  IndexType, IndexTypes
} from './interfaces'
import * as env from '../env'
import * as files from './files'
import * as templates from './templates'
import * as _ from 'lodash'
import * as logger from '../console'
const debug = logger.createDebugger()


const indexNames = {
  publication: 'PublicationComponents',
  fixture: 'PublicationFixtures',
  criteria: 'PublicationCriterias'/*,
  navigation: 'NavigationComponents',
  structure: 'StructureComponents'*/
}


const mapIndexType = ( indexName:IndexTypes|string ) => {
  if ( 'string' !== typeof indexName )
    return mapIndexType(IndexTypes[indexName])

  switch (indexName) {
    
    case "fixture":
      return IndexTypes.fixture

    case "criteria":
      return IndexTypes.criteria

/*    case "navigation":
      return IndexTypes.navigation

    case "structure":
      return IndexTypes.structure
*/
    case "publication":
    case "component":
      return IndexTypes.publication
    
  }

  return indexName
}

const nameForType = ( indexType:IndexTypes|number ) => {
  return IndexTypes[indexType]
}

export const buildIndexes = ( args:CLICommandArgsBuildIndexes={} ) => {
  const indexTypes = _.values(IndexTypes).filter(val => {
      if ( !isNaN(val) )
        return false
  
      return (
        args.filter 
        ? args.filter.indexOf(val) > -1 
        : true
      )
    } )
    //.map ( (indexTypeName:string) => IndexTypes[indexTypeName] )
  debug('build index types: %s', indexTypes)
  return Observable.from(indexTypes.map(indexType => mapIndexType(indexType)))
            .flatMap ( (indexType:IndexType) => {
              debug('indexType: ', IndexTypes[indexType])

              const source = files.filesForIndexType(indexType).map ( (row,idx) => {
                debug ( 'source file #%s: %s', idx, path.relative(process.cwd(),row) )
                return row
              } )
              const indexName = indexNames[nameForType(mapIndexType(indexType))]
              return templates.indexes.mapFilesToTemplateData(indexName,source,env.resolve(env.resolveKioPath('root')))
                  .map ( (templateData,idx) => {
                    debug('templateData indexName',idx,indexName)
                    return {
                      indexName: indexName,
                      templateData
                    }
                  } )
            } )
            .flatMap ( 
              item => templates.indexes
                .render(item.indexName,item.templateData) 
                .flatMap ( 
                  contents => {
                    const indexFileName = env.resolve(env.resolveKioPath('root'),item.indexName+'.generated.ts')
                    return templates.replaceFile(indexFileName,contents).map ( status => ({
                      indexFileName: path.relative(env.resolveRoot('.'),indexFileName),
                      status
                    }) )
                  }
                )
                .map ( ( {indexFileName,status}, idx ) => {
                  return indexFileName
                } )
            )
            
}
