export * from './create'
export * from './interfaces'
export * from './components'
export * from './config'

import * as files from './files'
import * as templates from './templates'

import { buildIndexes } from './buildIndexes'
import { createComponent, createComponentWithCLIArgs } from './createComponent'
import { testComponents } from './testComponents'


export { 
  templates, 
  createComponent,
  createComponentWithCLIArgs ,
  testComponents,
  buildIndexes,
  files
}
