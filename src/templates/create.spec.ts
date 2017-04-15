import 'mocha'
import expect, { assertExists } from '../assert';

import { Template, TemplateFile, TemplateData, TemplateName, TemplateSource } from './interfaces'
import { Types } from './types'

import * as logger from '../console'

import { resolveTargetWithName } from './resolveTarget'
import { findTemplateSourceFiles } from './files'
import * as env from '../env'
import * as cache from '../cache'

import { getIndex, IndexFileMap, getIndexFilePath, IndexName, IndexFilenames } from '../indexes'

import { createTemplateSource, createTemplate, createTemplateByName } from './create'

describe('createTemplateSource',() => {  

  it ('creates source', () => {
    const source = createTemplateSource("index")
    expect(source).toExist()
  })
   
})

describe('createTemplateByName',() => {

  it('creates template',()=>{
    const template = createTemplateByName('index')
    expect(template).toContainKeys(['source','targetRoot'])
  })

})


describe('index data',()=>{

  IndexFilenames.forEach(IndexFilename=>{
    describe(IndexFilename,()=>{

      const testData = getIndex(IndexFilename)
      it('has index data',()=>{
        expect(testData).toExist()
        logger.log('index data',testData)
      })

    })
  })

})

