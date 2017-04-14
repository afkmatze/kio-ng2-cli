import * as path from 'path'

import { Component } from '../classes'
import * as env from '../../env/constants'
import * as stringUtils from '../../utils/string'

const STYLES = path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.root,'scss')


export const mapComponent = ( component:Component ) => {
  return {
    styles: '../'+path.relative(component.dir,STYLES),
    contentType: component.contentType,
    modifiers: component.modifiers,
    childTypes: component.childTypes,
    joinedChildTypes: component.childTypes.map(ct => `'${ct}'`).join(','),
    dasherizedModuleName: stringUtils.dasherize(component.name),
    classifiedModuleName: stringUtils.classify(component.name),
    pathToStructureComponents: path.relative(component.dir,env.KIO_PATHS.components.structure),
    classifiedParentComponentName: stringUtils.classify(['kio','abstract',component.contentType,'component'].join('-')),
    selector: stringUtils.dasherize(['publication',component.name].join('-')),
    dasherizedParentComponentPath: stringUtils.dasherize(stringUtils.classify(['kio','abstract',component.contentType].join('-'))),
    dasherizedParentComponentName: stringUtils.dasherize(stringUtils.classify(['kio','abstract',component.contentType].join('-')))
  }
}