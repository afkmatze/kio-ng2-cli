import 'mocha'
import expect from 'ceylon'
import * as path from 'path'
import assertFs from '../../../assert/fs'

import { ChildProcessOptions, ChildProcess, CommandParams, ExecCallback } from './child_process'

const TEST_TARGET = path.resolve(__dirname,'../../../../test_target/src')


describe('testing child process',()=>{

  describe('exec find at ' + TEST_TARGET,function(){

    this.timeout(5 * 1000)

    it('finds all files',(done)=>{

      const child = new ChildProcess({
        command: 'find . -type file'
      })

      child.exec()
          .map ( data => {
            if ( data["stdout"] !== undefined )
            {
              console.log('stdout', data["stdout"] )
            }
            else if ( data["stderr"] !== undefined )
            {
              console.log('stderr', data["stderr"] )
            }
          } )
          .subscribe ( row => {
            console.log('row', row )
          }, error => {
            console.error(error)
            done(error)
          }, done )

    })

  })

})
