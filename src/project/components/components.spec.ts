import 'mocha'
import * as path from 'path'
import { KioNodeType } from 'kio-ng2'

import expect, { assertExists } from '../../assert'
import assertFs from '../../assert/fs';
import * as components from './'



describe('components',()=>{
   

  describe('creates',()=>{

    const fixture = {
      name: 'TestFragment',
      type: KioNodeType.fragment,
      modifiers: ['foo','bar'],
      childTypes: ['txt','src']
    }

    it('creates',()=>{

      if ( components.isNamedFragmentComponentStructure(fixture) )
      {
        const data = components.dataForNamedFragmentComponent(fixture)
        console.log('data',data)
        expect(data).toContainKeys([
          'name',
          'type',
          'selector',
          'modifiers',
          'childTypes',
          'classifiedModuleName',
          'dasherizedModuleName',
          'classifiedParentComponentName',
          'dasherizedParentComponentPath'
          ])

        return components.writeComponent(data,process.env.KIO_NG2_PROJECT).toPromise()
          .then ( res => {
            console.log('wrote',res)
          } )
          .catch ( error => {
            console.error(error)
          } )
      }
    })



  })

})