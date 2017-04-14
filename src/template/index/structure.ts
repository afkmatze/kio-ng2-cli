import { IndexTemplateData } from '../interfaces'
import { Component } from '../../components/classes'
import { TEMPLATES, KIO_PATHS } from '../../env/constants'
import * as path from 'path'
import * as ejs from 'ejs'
import { find, cat, echo, mkdir } from 'shelljs'
import * as fs from 'fs'
import * as logger from '../../console'

const TEMPLATE_SOURCE = cat(path.join(TEMPLATES,'index','ComponentIndex.ts'))

export const writeComponent = ( component:Component ) => {
  //return ejs.render()
}

export const write = ( components:Component[] ) => {
  
  const targetDir = KIO_PATHS.components.structure
  return components.map ( writeComponent )
}