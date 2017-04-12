import * as path from 'path'
import * as ejs from 'ejs'
import * as stringUtils from '../../utils/string'
import * as logger from '../../console'
import * as env from '../../env/constants'
import * as fs from 'fs'

import { find, cat, echo, mkdir } from 'shelljs'

import { KioComponentType, KioComponent, KioStructureComponent, KioPublicationComponent } from '../../interfaces/kio-component'
import { KioContentType } from 'kio-ng2'

const TEMPLATES = path.resolve(__dirname,'../../../templates')
const STYLES = path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.root,'scss')

export const renderType = ( options:KioPublicationComponent ) => {

  const typeName = options.contentType
  const templateDir = path.resolve ( TEMPLATES , typeName )
  const renderOptions:ejs.Options = {
    filename: stringUtils.dasherize(options.name)
  }
  const outputDir = path.join(env.KIO_PROJECT_ROOT,options.dir)

  logger.log('outputDir',outputDir)
  mkdir('-p',outputDir)

  //const parentComponentName = stringUtils.classify(['kio','abstract',typeName,'component'].join('-'))

  find(templateDir)
  .filter ( item => /\_\_name/.test(item) )
  .forEach ( item => {
    const outputFile = item.replace(/__\w+__/gm,renderOptions.filename).replace(TEMPLATES,env.KIO_PATHS.components.publication)
    const data:ejs.Data = Object.assign({},options,{
      styles: '../'+path.relative(outputFile,STYLES),
      joinedChildTypes: options.childTypes.map(ct => `'${ct}'`).join(','),
      dasherizedModuleName: stringUtils.dasherize(options.name),
      classifiedModuleName: stringUtils.classify(options.name),
      pathToStructureComponents: path.relative(outputDir,env.KIO_PATHS.components.structure),
      classifiedParentComponentName: stringUtils.classify(['kio','abstract',typeName,'component'].join('-')),
      selector: stringUtils.dasherize(['publication',options.name].join('-')),
      dasherizedParentComponentPath: stringUtils.dasherize(stringUtils.classify(['kio','abstract',typeName].join('-'))),
      dasherizedParentComponentName: stringUtils.dasherize(stringUtils.classify(['kio','abstract',typeName].join('-')))
    })
    logger.log('render template: "%s"' , outputFile )
    const result = ejs.render(
      cat(item),
      data,
      renderOptions)
    fs.writeFileSync(outputFile,result,{encoding: 'utf8'})
  } )

  

}
