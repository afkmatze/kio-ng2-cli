import 'mocha'
import expect, { assertExists } from '../../assert';
import { readTemplateFilesStream } from './source'
import { Readable, Transform, Writable } from 'stream'

describe('test source class',()=>{

  let fileStream:Transform
  before(()=>{
    fileStream = readTemplateFilesStream('index')
    fileStream.pipe(process.stdout)
  })

  it('can read',(done)=>{
    fileStream.on('data',(data)=>{
      console.log('file stream data',data)
    })
    fileStream.on('error',done)
    fileStream.on('end',()=>{
      done()
    })
  })



})