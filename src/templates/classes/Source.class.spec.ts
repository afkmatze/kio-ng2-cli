import 'mocha'
import expect, { assertExists } from '../../assert';

import { TemplateSource } from './Source.class'

describe('test source class',()=>{

  let readStream:TemplateSource
  before(()=>{
    readStream = new TemplateSource({
      templateName: 'index'
    })
  })

  it('can read',()=>{
    readStream.pipe(process.stdout)
    
  })

})