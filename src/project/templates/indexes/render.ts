import * as rxfs from '../../../utils/rx/fs'
import * as path from 'path'
import * as ejs from 'ejs'
import { dasherize, classify, camelize } from '../../../utils/string'
import { Observable } from 'rxjs'
import { IndexTemplateData, IndexTemplateDataItem, IndexType, IndexTypes } from './interfaces'
import { Component, ComponentType, PublicationComponent, StructureComponent, NavigationComponent } from '../../interfaces'

const TEMPLATE_DIR = path.resolve(__dirname,'../../../../templates/index')

export const mapTemplateData = <ComponentType>( component:Component<ComponentType>, relativeTo:string ):IndexTemplateDataItem => {
  const item:IndexTemplateDataItem = {
    importName: classify(component.name),
    importPath: './'+path.relative(relativeTo,component.dir)
  }
  return item
}

export const mapFilesToTemplateData = ( exportName:string, files:Observable<string>, relativeTo:string ):Observable<IndexTemplateData> => {
  return files.toArray()
          .map( files => {
            return {
              exportName,
              indexItems: files.map( file => mapFileToTemplateDataItem(file,relativeTo) )
            }
          }) 

}

export const mapFileToTemplateDataItem = ( filepath:string, relativeTo:string ):IndexTemplateDataItem => {

  const componentBaseName = path.basename(filepath,'.ts').split('.component').join('')
  const [ componentName='', typeName='' ] = componentBaseName.split('.') || []

  const componentRoot = path.relative(relativeTo,path.dirname(filepath))

  if ( !componentName )
  {
    throw Error('Invalid component name at "' + filepath + '".')
  }

  const item:IndexTemplateDataItem = {
    importName: classify(componentName),
    importPath: './'+path.relative(relativeTo,filepath)
  }

  if ( !rxfs.existsSync(path.resolve(relativeTo,path.dirname(item.importPath))) )
  {
    console.log('componentRoot', componentRoot)
    console.log('componentBaseName', componentBaseName)
    console.log('item.importPath', item.importPath)
    throw Error(`\n\n${item.importPath} is not a valid directory`);  
  }

  item.importPath = item.importPath.replace(/\.ts$/,'')

  if ( !typeName )
  {
    item.importName += 'Component'
  }
  else if ( typeName === 'fixture' )
  {
    item.importAlias = 'Fixture'
  }
  else if ( typeName === 'criteria' )
  {
    item.importAlias = 'Criteria'
  }
  return item
}

export const render = ( indexName:string, data:IndexTemplateData ) => {
  return rxfs.readfile(path.join(TEMPLATE_DIR,'ComponentIndex.ts'),true)
        .flatMap( contents => {
          return Observable.of(ejs.render(contents.toString(),data))
        } )
}