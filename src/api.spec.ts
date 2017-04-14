import 'mocha'
import expect from 'ceylon';
import { Component, PublicationComponent } from './components'
import * as logger from './console'
import * as api from './api'
import * as fs from 'fs'
import * as shelljs from 'shelljs'
import * as env from './env/constants'
import * as cache from './cache'

import { dataForIndex } from './indexes/template'
import * as template from './template'

const NUM_PUBLICATION_COMPONENTS = fs.readdirSync(cache.resolve('components','publication')).filter(item=>/^\./.test(item)===false).length
const NUM_STRUCTURE_COMPONENTS = fs.readdirSync(cache.resolve('components','structure')).filter(item=>/^\./.test(item)===false).length
const NUM_NAVIGATION_COMPONENTS = fs.readdirSync(cache.resolve('components','navigation')).filter(item=>/^\./.test(item)===false).length


const assertComponentType = ( componentType:string ) => {
  if ( componentType === 'structure' || componentType === 'navigation' )
  {
    return ( component ) => {
      expect(component).toBeA(Component)
      expect(component instanceof PublicationComponent).toEqual(false,`expected ${component.toString()} of type ${componentType} to be not an instance of ${component.constructor.name}`)
    }
  }
  return ( component ) => {
      expect(component).toBeA(PublicationComponent)
    }
}

describe('test api',() => {

  describe('find components',()=>{

    it(`has ${NUM_STRUCTURE_COMPONENTS} structure components`,()=>{
      const comps = api.getComponents('structure')
      expect(comps.length).toEqual(NUM_STRUCTURE_COMPONENTS)
      comps.forEach(assertComponentType('structure'))
    })

    it(`has ${NUM_NAVIGATION_COMPONENTS} navigation components`,()=>{
      const comps = api.getComponents('navigation')
      expect(comps.length).toEqual(NUM_NAVIGATION_COMPONENTS)
      comps.forEach(assertComponentType('navigation'))
    })

    it(`has ${NUM_PUBLICATION_COMPONENTS} publication components`,()=>{
      const comps = api.getComponents('publication')
      expect(comps.length).toEqual(NUM_PUBLICATION_COMPONENTS)
      comps.forEach(assertComponentType('publication'))
    })
    
  })

  describe('compose index',()=>{

    describe('publication',()=>{

      describe('components',()=>{

        const publicationIndex = api.getIndex('publication')

        it('has components',()=>{
          expect(publicationIndex.components).toBeAn(Array)
          expect(publicationIndex.components.length).toEqual(NUM_PUBLICATION_COMPONENTS)
        })

        it('all components are publication components',()=>{
          publicationIndex.components.forEach(assertComponentType('publication'))
        })      

        it('template fits',()=>{
          const data = dataForIndex(publicationIndex)
          expect(data.components).toHaveLength(publicationIndex.components.length)
          const tmpl = template.getFiles('index')
          expect(tmpl).toHaveLength(1)
        })

      })

      describe('fixtures',()=>{

        const publicationIndex = api.getIndex('fixture')

        it('has components',()=>{
          expect(publicationIndex.components).toBeAn(Array)
          expect(publicationIndex.components.length).toNotBe(0)        
        })

        it('all components are publication components',()=>{
          publicationIndex.components.forEach(assertComponentType('publication'))
        })      

      })

      describe('criterias',()=>{

        const publicationIndex = api.getIndex('criteria')

        it('has components',()=>{
          expect(publicationIndex.components).toBeAn(Array)
          expect(publicationIndex.components.length).toNotBe(0)        
        })

        it('all components are publication components',()=>{
          publicationIndex.components.forEach(assertComponentType('publication'))
        })      

      })

    })

    describe('structure',()=>{

      const structureIndex = api.getIndex('structure')

      it('has components',()=>{
        expect(structureIndex.components).toBeAn(Array)
        expect(structureIndex.components.length).toNotBe(0)        
      })

      it('all components are structure components',()=>{
        structureIndex.components.forEach(assertComponentType('structure'))
      })

    })

    describe('navigation',()=>{

      const navigationIndex = api.getIndex('navigation')

      it('has components',()=>{
        expect(navigationIndex.components).toBeAn(Array)
        expect(navigationIndex.components.length).toNotBe(0)        
      })

      it('all components are navigation components',()=>{
        navigationIndex.components.forEach(assertComponentType('navigation'))
      })

    })

  })

  describe('template rendering',()=>{

    describe('index templates',()=>{

      describe('publication components',()=>{

        const index = api.getIndex('publication')

         it('renders index',()=>{
           const data = dataForIndex(index)
           const result = template.renderIndex(data)
           expect(result).toHaveLength(1)
         })

      })


      describe('fixture components',()=>{

        const index = api.getIndex('fixture')

         it('renders index',()=>{
           const data = dataForIndex(index)
           const result = template.renderIndex(data)
           console.log('result %s',result)
           expect(result).toHaveLength(1)
         })

      })

    })

  })

})