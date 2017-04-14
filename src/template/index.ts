import * as read from './read'
import * as render from './render'
import { IndexTemplateData } from './interfaces'

import * as ejs from 'ejs'

export * from './read'
export * from './interfaces'
export * from './render'

import { ComponentIndex  } from '../indexes/interfaces'

export const renderIndex = ( index:IndexTemplateData ) => {
  return read.getFiles('index')
        .map ( filename => read.readFile('index',filename) )
        .map ( fileData => ejs.render(fileData,index) )
}