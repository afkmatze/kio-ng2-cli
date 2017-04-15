import { findComponents } from './find'
import { Component, PublicationComponent } from './classes'
import { dataForTemplate } from './template'
import * as env from '../env'

import * as logger from '../console'

import 'mocha'
import expect from 'ceylon';

describe('test component template',() => {

  let component:PublicationComponent

  before(()=>{
    component = findComponents("publication").find( component => component.contentType === 'fragment' )    
  })

  it('component resolves relative path',()=>{
    const target = env.path.join(env.KIO_PATHS.components.structure)
    const relpath = component.relativeTo(target)
  })


  it('data is ok',()=>{
    const data = dataForTemplate(component)
  })

})
