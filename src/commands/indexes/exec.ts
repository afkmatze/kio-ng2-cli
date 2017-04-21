import { Observable, Scheduler } from 'rxjs'
import { KioComponentType, ComponentModel, Component, PublicationComponent } from '../../components'
import { IndexName, IndexType, ComponentIndex } from '../../indexes/interfaces'
import * as componentSource from '../../components/source'
import { templateFiles, TemplateFile, TemplateData, IndexTemplateData, IndexTemplateDataItem } from '../../templates'
import * as index from '../../indexes'
import * as logger from '../../console'
import * as rxfs from '../../utils/rx/fs'
import { CommandConfigBuildIndexes, BuildIndexFilterArg, BuildIndexArgs, path, KIO_PATHS, KIO_PROJECT_ROOT } from '../../env'

import * as templateCreate from '../../templates/types/index/create'
import * as templateRender from '../../templates/types/index/render'
//import * as templateFiles from '../../templates/files'

const log = ( txt ) => {
  console.log(txt)
}

const logMap = (value,idx)=>{
   console.log('value %s\n---\n',idx,value,'\n---')
   return value
 }

const indexTypeFilter = ( typeName:string ) => {
  if ( /publication|fixture|criteria/.test(typeName) )
  {
    return ( component:ComponentModel ) => component instanceof PublicationComponent
  }
  if ( typeName === 'structure' )
  {
    return ( component:ComponentModel ) => KioComponentType[component.typeName] === KioComponentType.StructureComponent 
  }
  if ( typeName === 'navigation' )
  {
    return ( component:ComponentModel ) => KioComponentType[component.typeName] === KioComponentType.NavigationComponent 
  }
  return () => false
}

const applyFilter = ( filter:BuildIndexFilterArg|BuildIndexFilterArg[]=[] ) => {
  
  if ( filter && !Array.isArray(filter) )
    filter = [filter]

  return (component:ComponentModel,idx) => {   
    
    if ( filter.length === 0 || !filter )
    {
      return true
    }
    else if ( component instanceof PublicationComponent )
    {
      return !!Array.from(filter).find ( key => /publication|fixture|criteria/.test(key) )
    }
    else if ( KioComponentType[component.typeName] === KioComponentType.StructureComponent )
    {
      const filterIndex = Array.from(filter).indexOf('structure')
      //console.log('filter index of "%s"', 'structure', filterIndex)
      return filterIndex > -1
    }
    else if ( KioComponentType[component.typeName] === KioComponentType.NavigationComponent )
    {
      const filterIndex = Array.from(filter).indexOf('navigation')
      //console.log('filter index of "%s"', 'navigation', filterIndex)
      return filterIndex > -1
    }

    return false

  }
}

const mapComponentToIndexItem = ( indexType:IndexType, component:ComponentModel ):IndexTemplateDataItem => {
  const indexName = IndexType[indexType]
  let rootPath:string = path.join(KIO_PATHS.root)
  const importAlias = mapImportAlias[indexName] || ''
  const suffix = importAlias ? '.cquery.'+indexName : ''
  return {
    importName: component.name+(!importAlias?'Component':''),
    importPath: './'+path.join(component.relativeFrom(KIO_PATHS.root),component.dasherizedName+'.component'+suffix),
    importAlias: importAlias
  }
}

const mapExportNames = {
  "fixture": "PublicationFixtures",
  "criteria": "PublicationCriterias",
  "publication": "PublicationComponents",
  "navigation": "NavigationComponents",
  "structure": "StructureComponents"
}

const mapImportAlias = {
  "fixture": "Fixture",
  "criteria": "Criteria"
}

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
}

export const createIndexTemplateData = ( indexType:IndexType, components:ComponentModel[] ):IndexTemplateData => {
  const indexName = IndexType[indexType]  
  const templateData:IndexTemplateData = {
    exportName: mapExportNames[indexName],
    indexItems: components.map ( component => mapComponentToIndexItem(indexType,component) )
  }
  return templateData
}

const getIndexFileName = ( indexName:string ) => path.join(KIO_PATHS.root,`${mapExportNames[indexName]}.generated.ts`)

export const writeComponentsToIndexTemplate = ( indexType:IndexType, components:Observable<ComponentModel>|ComponentModel[] ) => {
  const indexName = IndexType[indexType]

  if ( !Array.isArray(components) )
  {
    return components.toArray().flatMap( componentsList => writeComponentsToIndexTemplate(indexType,componentsList) )
  }


  const source = templateFiles("index",(file:TemplateFile)=>{
    const filename = `${mapExportNames[indexName]}.generated.ts`
    return {
      filename,
      absoluteFilepath: path.join(KIO_PATHS.root,filename),
      source: file.source
    }
  }).catch( error => {
    logger.logError(error,false)
    return Observable.throw(error)
  })
  

  const templateData = createIndexTemplateData(indexType, components)

  return source.flatMap( (templateFile:TemplateFile) => {
    logger.debug('write template \x1b[1m%s\x1b[0m at %s', indexName, templateFile.absoluteFilepath )
    ///logger.debug('%s components', components)
    //logger.keys(components,"*")
    return templateRender.renderTemplateFileWithData(templateFile,templateData)
      .flatMap ( content => rxfs.writeFile(templateFile.absoluteFilepath,content) )
  } )
}

const defaultConfig = {
  filter: ["publication","navigation","structure","fixture","criteria"],
  noCache: false
}


export const selectSource = ( cached:boolean=true ) => {

  if ( cached === false || !componentSource.cache.exists('components') )
  {
    logger.log('cache not existing')    
    return componentSource.tsc.fetch().flatMap((component:any) => {
      return componentSource.cache.write(component).map ( filename => component )
    })
  }
  return componentSource.cache.fetch()
}

const indexNames = ['publication','navigation','structure','fixture','criteria']

export const writeEmptyIndexFiles = () => {
  return Observable.concat(indexNames).flatMap ( indexName => {
    const templateFile = getIndexFileName(indexName)
    return rxfs.existsSync(templateFile) ? Observable.empty() : writeComponentsToIndexTemplate(IndexType[indexName],[])
  } )
}

export default ( config:BuildIndexArgs=defaultConfig ):Observable<string[]> => {
  
  let filter:BuildIndexFilterArg|BuildIndexFilterArg[] = config.filter || defaultConfig.filter

  if ( filter && !Array.isArray(filter) )
    filter = [filter]

  const indexTemplate = templateCreate.createTemplateByName("index")
  indexTemplate.source = templateCreate.createTemplateSource("index")

  return Observable.concat(
    writeEmptyIndexFiles(),
    refreshSource().toArray().flatMap ( list => {
      return Observable.from(filter)
          .flatMap( filter => {
            //logger.log('find components for filter "%s"', filter )
            return selectSource().filter(applyFilter(filter)).toArray()
              .map(
                components => {
                  return {
                    filter,
                    components
                  }
                }
              )
          }, 1 )
          //.toArray()
          .concatMap(result => {
              //logger.log('%s-filtered components: %s', result.filter, result.components)
              return writeComponentsToIndexTemplate(IndexType[result.filter],result.components).map (
                ( filename ) => {
                  return filename
                }
              )
            })
    } )
  )

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
}