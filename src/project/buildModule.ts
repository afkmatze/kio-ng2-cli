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


export const buildIndexes = ( projectPath:string ) => ( args:CLICommandArgsBuildIndexes={} ) => {
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
  const targetPath = env.resolve(env.resolveKioPath('root'),'publication')
  debug('build index module at %s', targetPath)
  return Observable.of(IndexTypes.publication)
            .flatMap ( (indexType:IndexType) => {
              debug('indexType: ', IndexTypes[indexType])

              const source = files.filesForIndexType (projectPath) (indexType).map ( (row,idx) => {
                debug ( 'source file #%s: %s', idx, path.relative(process.cwd(),row) )
                return row
              } )
              const indexName = "PublicationComponents"
              return templates.indexes.mapFilesToTemplateData(indexName,source,targetPath)
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
                    const indexFileName = env.resolve(env.resolveKioPath('root'),'publication',item.indexName+'.generated.ts')
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



export default ( projectPath:string ) => ({
  buildIndexes: buildIndexes(projectPath)
})