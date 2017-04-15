import 'mocha'
import expect, { assertExists } from './assert';
import assertFs from './assert/fs';
import { Component, PublicationComponent, KioPublicationComponent, KioComponentType, createWithData } from './components'
import * as logger from './console'
import * as api from './api'
import * as fs from 'fs'
import * as shelljs from 'shelljs'
import * as env from './env/constants'
import * as cache from './cache'

import { dataForIndex } from './indexes/template'
import { IndexName } from './indexes/interfaces'
import * as template from './template'
import * as stringUtils from './utils/string'

let NUM_PUBLICATION_COMPONENTS // = fs.readdirSync(cache.resolve('components','publication')).filter(item=>/^\./.test(item)===false).length
let NUM_STRUCTURE_COMPONENTS // = fs.readdirSync(cache.resolve('components','structure')).filter(item=>/^\./.test(item)===false).length
let NUM_NAVIGATION_COMPONENTS // = fs.readdirSync(cache.resolve('components','navigation')).filter(item=>/^\./.test(item)===false).length

const mockComponent = () =>{
  const TEST_COMP_NAME = 'test-chapter'
  const options:KioPublicationComponent = {
    componentType: KioComponentType.PublicationComponent,
    contentType: 'fragment',
    name: TEST_COMP_NAME,
    modifiers: ['chapter'],
    childTypes: ['txt','txt','src'],
    dir: env.resolve("publication",'fragment/'+stringUtils.dasherize(TEST_COMP_NAME))
  }
/*
    renderType(options)*/

    const component = createWithData(options)
    //api.renderPublicationComponent(<PublicationComponent>component)
    return component
}


const readCounts = () =>{
  NUM_PUBLICATION_COMPONENTS = fs.readdirSync(cache.resolve('components','publication')).filter(item=>/^\./.test(item)===false).length
  NUM_STRUCTURE_COMPONENTS = fs.readdirSync(cache.resolve('components','structure')).filter(item=>/^\./.test(item)===false).length
  NUM_NAVIGATION_COMPONENTS = fs.readdirSync(cache.resolve('components','navigation')).filter(item=>/^\./.test(item)===false).length
}

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

const assertIndex = ( indexName:IndexName ) => {
  describe(indexName+' index',()=>{

        const index = api.getIndex(indexName)
        const exportName = indexName.slice(0,1).toUpperCase()+indexName.slice(1)
        const indexFilename = api.getIndexFilePath(indexName)

         it('renders index "' + exportName + '"',()=>{
           const result = api.renderTemplate('index',index)
           expect(result.files).toBeAn(Array)
           expect(result.files).toHaveLength(1)
           result.files.forEach(item=>{
             expect(item.rendered).toContain("export const "+exportName)
           })
           //logger.log('rendered template: \n' , result.join('\n'))           
         })

         /*it(`writes index to "${indexFilename}"`,()=>{           
           api.writeIndex(indexName)
           assertFs(indexFilename).toBeAFile()
         })*/

      })
}

describe('test api',() => {

  xdescribe('cache',function(){
    this.timeout(30 * 1000)

    it('is reset',()=>{
      cache.clear()
      assertFs(env.KIO_PROJECT_CACHE).toNotBeDirectory()
    })


    describe('components cache',()=>{

      it('is created',()=>{
        return cache.create("components")
          .then ( items => {
            assertFs(env.KIO_PROJECT_ROOT).toBeADirectory()
          } )
      })

    })

  })

  before(function(){
    //this.timeout(30 * 1000)
    readCounts()
    /*return cache.create("components")
      .then (()=>{
        return readCounts()
      })*/
  })

  xdescribe('find components',()=>{
    it(`has structure components`,()=>{
      //assertFs(api.getIndexFilePath('structure')).toBeAFile()
      const comps = api.getComponents('structure')
      expect(comps.length).toEqual(NUM_STRUCTURE_COMPONENTS)
      comps.forEach(assertComponentType('structure'))
    })

    it(`has navigation components`,()=>{
      const comps = api.getComponents('navigation')
      expect(comps.length).toEqual(NUM_NAVIGATION_COMPONENTS)
      comps.forEach(assertComponentType('navigation'))
    })

    it(`has publication components`,()=>{
      const comps = api.getComponents('publication')
      expect(comps.length).toEqual(NUM_PUBLICATION_COMPONENTS)
      comps.forEach(assertComponentType('publication'))
    })
    
  })

  xdescribe('compose index',()=>{

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

    xdescribe('structure',()=>{

      const structureIndex = api.getIndex('structure')

      it('has components',()=>{
        expect(structureIndex.components).toBeAn(Array)
        expect(structureIndex.components.length).toNotBe(0)        
      })

      it('all components are structure components',()=>{
        structureIndex.components.forEach(assertComponentType('structure'))
      })

    })

    xdescribe('navigation',()=>{

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
/*
      describe('navigation components',()=>{

        const index = api.getIndex('navigation')

         it('renders index',()=>{
           const result = api.renderIndex('navigation')
           expect(result).toMatch(/export const NavigationComponents/)
           //logger.log('rendered template: \n' , result.join('\n'))           
         })

         it('writes index',()=>{

         })

      })

*/
      assertIndex('navigation')
      assertIndex('structure')
      assertIndex('publication')
      assertIndex('fixture')
      assertIndex('criteria')


    })

    describe('component template rendering',()=>{

      let component
      let componentTemplate:template.TemplateFiles

      before(()=>{
        component = mockComponent()
      })

      it('create template',()=>{
        componentTemplate = template.createTemplate("publication",env.resolve(env.KIO_PATHS.components.publication))
        expect(componentTemplate).toContainKeys(['files','templateName','targetDir'])
        logger.log('componentTemplate',componentTemplate)
      })

      it('find template files',()=>{
        componentTemplate = template.readTemplate(componentTemplate)
        expect(componentTemplate.files.length).toNotBe(0)
        logger.log('componentTemplate',componentTemplate)
      })

      it('component renders',()=>{
        const result = api.renderPublicationComponent(component)
        console.log('result',result)
      })

    })

  })

})

