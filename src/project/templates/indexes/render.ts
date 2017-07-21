import * as rxfs from 'rxfs'
import * as env from '../../../env'
import * as path from 'path'
import * as ejs from 'ejs'
import { dasherize, classify, camelize } from '../../../utils/string'
import { Observable } from 'rxjs'
import { IndexTemplateData, IndexTemplateDataItem, IndexType, IndexTypes } from './interfaces'
import { Component, ComponentType, PublicationComponent } from '../../interfaces'

const TEMPLATE_DIR = path.resolve(__dirname,'../../../../templates/publication-module')



export const render = ( indexName:string, data:IndexTemplateData ) => {
  return rxfs
    .readFile(path.join(TEMPLATE_DIR,'module.ts'),'utf8')
    .toArray().map ( rows => rows.join('\n') )
    .flatMap( 
      contents => {
        //console.log('render(%s)\n-----\n\x1b[2m', indexName, contents,'\n-----\x1b[0m')
        //console.log(data)
        return Observable.of(ejs.render(contents,data))
      } 
    ).map ( contents => {
      //console.log('contents\n----\n',contents,'\n----\n')
      return contents
    } )
}



export const mapTemplateData = <ComponentType>( component:Component<ComponentType>, relativeTo:string ):IndexTemplateDataItem => {
  const item:IndexTemplateDataItem = {
    importName: classify(component.name),
    importPath: './'+path.relative(relativeTo,component.dir)
  }
  return item
}

export const mapFilesToTemplateData = ( exportName:string, files:Observable<string>, relativeTo:string ):Observable<IndexTemplateData> => {
  return files
          .toArray()
          .map( files => {
            //console.log('mapFilesToTemplate::exportName',exportName,files)
            return {
              exportName,
              indexItems: files
                .map( file => mapFileToTemplateDataItem(file,relativeTo) )
                .filter ( item => !!item.importName )
            }
          }) 

}

export const mapFileToTemplateDataItem = ( filepath:string, relativeTo:string ):IndexTemplateDataItem => {

  const componentBaseName = path.basename(filepath,'.ts').split('.component')
                            .map( val => val.replace('.cquery','') )
                            .join('')
  const [ componentName='', typeName='' ] = componentBaseName.split('.') || []

  //console.log('componentBaseName',componentBaseName)
  //console.log('componentName',componentName)
  //console.log('typeName',typeName)

  const componentRoot = path.relative(relativeTo,path.dirname(filepath))

  if ( !componentName )
  {
    throw Error('Invalid component name at "' + filepath + '".')
  }

  const item:IndexTemplateDataItem = {
    importName: classify(componentName),
    importPath: './'+path.relative(relativeTo,filepath)
  }
  //console.log('map template data - relativeTo', item.importPath)

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
