import 'mocha'
import expect, { assertExists } from '../assert';

import { Component, PublicationComponent, KioPublicationComponent, KioComponentType, createWithData } from '../components'

import { ComponentIndex } from '../indexes/interfaces'
import assertFs from '../assert/fs';
import * as env from '../env'

import * as templates from './'
import * as create from './create'
import * as render from './render'
import * as indexes from '../indexes'


const mockComponent = () =>{
  const TEST_COMP_NAME = 'test-chapter'
  const options:KioPublicationComponent = {
    componentType: KioComponentType.PublicationComponent,
    contentType: 'fragment',
    name: TEST_COMP_NAME,
    modifiers: ['chapter'],
    childTypes: ['txt','txt','src'],
    dir: env.resolve("publication",'fragment/'+TEST_COMP_NAME)
  }
  const component = createWithData(options)
  return component
}

const mockIndex = () => {
  return indexes.getIndex('publication')

}