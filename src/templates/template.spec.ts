import 'mocha'
import expect, { assertExists } from '../assert';

import { Component, PublicationComponent, KioPublicationComponent, KioComponentType, createWithData } from '../components'

import { ComponentIndex } from '../indexes/interfaces'
import assertFs from '../assert/fs';
import * as env from '../env'

import * as templates from './'
import * as indexes from '../indexes'
import * as create from './create'
import * as render from './render'


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


const templateNames:templates.TemplateName[] = [
  "index","txt","src","fragment"
]

const EXPECTED_TEMPLATE_PATH = {
  "index": env.KIO_PATHS.root,
  "src": env.path.join(env.KIO_PATHS.components.publication,"src"),
  "txt": env.path.join(env.KIO_PATHS.components.publication,"txt"),
  "fragment": env.path.join(env.KIO_PATHS.components.publication,"fragment")
}

describe('test templates',()=>{

  templateNames.forEach(templateName=>{
    describe(`test type ${templateName}`,()=>{

      describe('test misc',()=>{
        it(`resolves target for ${templateName}`,()=>{

          const target = templates.resolveTargetWithName(templateName)
          expect(target).toEqual(EXPECTED_TEMPLATE_PATH[templateName])
          //console.log('target "%s"',templateName,target)

        })

        it('finds template source files',()=>{

          const files = templates.findTemplateSourceFiles(templateName)
        })

        it(`creates template for ${templateName}`,()=>{
          const t = templates.createTemplateByName(templateName)
          console.log('template "%s"', templateName)
          console.log(t)
          expect(t).toContainKeys(['source','targetRoot'])
  /*        t.source.files.forEach(file=>{
            const targetFilepath = env.path.join(t.targetRoot,file.filename)
            console.log('targetFilepath: %s',targetFilepath)  
          })

  */        
         const comp = mockComponent()
          t.data = templates.Types["fragment"].mapTemplateData(comp)
          templates.renderTemplate(t)
          
        })

      })

      describe('test create "index"',()=>{

        let templateSource:templates.TemplateSource
        let template:templates.Template

        before(()=>{
          templateSource = create.createTemplateSource("index")

        })

        it('creates',()=>{

        })

      })

      describe('test render',()=>{

      })
      
    })
      
  })

})