import { Observable, Scheduler } from 'rxjs'
import * as path from 'path'
import { 
  Project, ProjectEnv,
  CLICommandArgs, CLICommandArgsBuildIndexes, CLICommandArgsCreateComponent,
  IndexType, IndexTypes
} from './interfaces'

import * as env from '../env'
import * as files from './files'
import { cache, ComponentCacheFileContent, ComponentFixture } from './cache'
import * as templates from './templates'
import * as _ from 'lodash'

const indexNames = {
  publication: 'PublicationComponents',
  fixture: 'PublicationFixtures',
  criteria: 'PublicationCriterias',
  navigation: 'NavigationComponents',
  structure: 'StructureComponents'
}

const mapIndexType = ( indexName:IndexTypes|string ) => {
  if ( 'string' !== typeof indexName )
    return mapIndexType(IndexTypes[indexName])

  switch (indexName) {
    
    case "fixture":
      return IndexTypes.fixture

    case "criteria":
      return IndexTypes.criteria

    case "navigation":
      return IndexTypes.navigation

    case "structure":
      return IndexTypes.structure

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

  return Observable.from(indexTypes.map(indexType => mapIndexType(indexType)))
            .flatMap ( (indexType:IndexType) => {
              const source = files.filesForIndexType(indexType)
              const indexName = indexNames[nameForType(mapIndexType(indexType))]
              return templates.indexes.mapFilesToTemplateData(indexName,source,env.KIO_PATHS.root)
                  .map ( templateData => {
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
                    const indexFileName = path.join(env.KIO_PATHS.root,item.indexName+'.generated.ts')
                    return templates.replaceFile(indexFileName,contents).map ( status => ({
                      indexFileName: path.relative(env.KIO_PROJECT_ROOT,indexFileName),
                      status
                    }) )
                  }
                )
                .map ( ( {indexFileName,status}, idx ) => {
                  return indexFileName
                } )
            )
            
}


export const createComponent = ( args:CLICommandArgsCreateComponent ) => {
  const {
    name ,
    contentType,
    childTypes,
    modifiers
  } = args

  const templateData = templates.publicationComponent.mapCLIArgsToTemplateData(args)

  return templates.publicationComponent.render(templateData)
        .flatMap ( (template,idx) => {
          const targetFile = path.join(env.KIO_PATHS.components.publication,template.filepath)
          return templates.replaceFile(targetFile,template.content)
        } )
        .toArray()
        .flatMap( list => {
          return buildIndexes({}).toArray().map(()=>list)
        } )
}

export { 
  templates, 
  files
}
