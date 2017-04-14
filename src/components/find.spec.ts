import { findComponents } from './find'
import { Component, PublicationComponent } from './classes'

import 'mocha'
import expect from 'ceylon';

describe('test component find',() => {

  it('finds structure',()=>{
    const components = findComponents('structure')
    expect(components).toBeAn(Array)
  })

  it('finds publication',()=>{
    const components = findComponents('publication')
    components.forEach(component=>{
      expect(component).toBeA(PublicationComponent)
      expect(component.getFiles()).toHaveLength(7)
      console.log('modifiers',component.modifiers)
      console.log('childTypes',component.childTypes)
    })
  })


  it('finds navigation',()=>{
    const components = findComponents('navigation')
    components.forEach(component=>{
      expect(component).toBeA(Component)
      //expect(component.dir).to.be.ok
      //console.log('component.getFiles()',component.getFiles())
    })
  })

})
