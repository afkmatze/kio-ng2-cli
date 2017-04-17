import { Observable, Scheduler } from 'rxjs'
import * as chalk from 'chalk'
import { KioComponentType, KioPublicationComponent, ComponentModel, Component, PublicationComponent } from '../../components'
import * as componentApi from '../../components'
import * as componentSource from '../../components/source'
import { templateFiles, TemplateFile, TemplateData, PublicationComponentTemplateData, PublicationComponentTemplateDataItem } from '../../templates'
import * as index from '../../indexes'
import * as cache from '../../cache'
import * as logger from '../../console'
import * as rxfs from '../../utils/rx/fs'
import * as stringUtils from '../../utils/string'
import { CommandConfigCreateComponent, path, KIO_PATHS, KIO_PROJECT_ROOT } from '../../env'

import * as templateCreate from '../../templates/types/publication/create'
import * as templateRender from '../../templates/types/publication/render'
import * as templateMap from '../../templates/types/publication/map'


const mapComponentToPublicationComponentTemplateData = ( component:PublicationComponent ): PublicationComponentTemplateData => {
  return templateMap.mapComponentData ( component )
}


export const writeComponentToCache = ( component:PublicationComponent ):Observable<PublicationComponent> => {
  logger.log('writing %s to cache', component )
  return componentSource.cache.write ( component ).map ( file => component )
}


export const writeTemplateFile = ( component:PublicationComponent, templateFile:TemplateFile ):Observable<PublicationComponent> => {
  const target = path.join(component.dir,path.basename(templateFile.filename))

  return Observable.fromPromise(
    rxfs.async.stat(target)
      .then ( (stats) => {
        logger.log(chalk.yellow('skipping existing')+' %s',target)
        return component
      } ) 
      .catch ( error => {
        logger.log('writing %s to file "%s"', component, templateFile.filename )
        return rxfs.async.writeFile(target,templateFile.source).then (() => component )
      } )
  )

}


export const execCreateComponent = ( config:CommandConfigCreateComponent ) => {


  const componentTemplate = templateCreate.createTemplateByName(config.contentType)
  componentTemplate.source = templateCreate.createTemplateSource(config.contentType)

  const componentData:KioPublicationComponent = {
    ...config,
    modifiers: config.modifiers || [],
    childTypes: config.childTypes || [],
    name: config.componentName,
    componentType: KioComponentType.PublicationComponent,
    dir: path.join(KIO_PATHS.components.publication,config.contentType,stringUtils.dasherize(config.componentName))
  }

  //logger.keys(componentData,'*','component data')
  
  const componentStream = writeComponentToCache(<PublicationComponent>componentApi.createWithData(componentData)).flatMap(component => {
    return rxfs.mkdir(component.dir).map ( dirpath => component )
  })

  return componentStream.flatMap(component => {
    
    logger.log('wrote %s to cache', component )

    const componentTemplateData = mapComponentToPublicationComponentTemplateData(component)  
    return templateFiles(component.contentType,(file:TemplateFile)=> {
      logger.debug('component filename %s', file.filename)
      const baseFilename = path.basename(file.filename)
      const pathname = component.dasherizedName
      const filename = path.join(pathname,baseFilename.replace('__name__',pathname))
      return {
        ...file,
        absoluteFilepath: path.join(KIO_PATHS.components.publication,config.contentType,filename),
        filename
      }
    }).flatMap ( file => {
      return templateRender.renderTemplateFileWithData(file,componentTemplateData)
          .map ( source => {
            return {
              ...file,
              source
            }
          } )
    } )
    .flatMap ( ( file:TemplateFile ) => {
      return writeTemplateFile(component,file)
    } )
  })
}

export default execCreateComponent