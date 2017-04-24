import 'mocha'
import expect from 'ceylon'
import * as path from 'path'
import assertFs from '../../../assert/fs'
import { find, findFiles } from './find'

const TEST_TARGET = path.resolve(__dirname,'../../../../test_target/src')


describe('testing find implementation',()=>{

  describe('find files in ' + TEST_TARGET,function(){

    this.timeout(5 * 1000)

    it('finds all files',()=>{

      return find(TEST_TARGET)
          .map ( (file:string,idx)=>{
            assertFs(file).toExist()
            return file
          } ).toArray()
          .toPromise()
          .then ( result => {
            console.log('done', result)
          } )

    })

  })

})
