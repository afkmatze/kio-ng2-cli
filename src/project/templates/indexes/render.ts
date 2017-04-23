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
  return files.map( file => mapFileToTemplateDataItem(file,relativeTo) )
          .toArray().map( files => ({
            exportName,
            indexItems: files
          }) )
}

export const mapFileToTemplateDataItem = ( filepath:string, relativeTo:string ):IndexTemplateDataItem => {

  const componentBaseName = path.basename(filepath,'.ts').split('.component').join('')
  const [ componentName='', typeName='' ] = componentBaseName.split('.') || []


  if ( !componentName )
  {
    throw Error('Invalid component name at "' + filepath + '".')
  }

  const item:IndexTemplateDataItem = {
    importName: classify(componentName),
    importPath: './'+path.relative(relativeTo,filepath).replace(/\.ts$/,'')
  }

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