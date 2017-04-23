import 'mocha'
import expect, { assert } from 'ceylon';

import * as stringUtils from './string'

describe('test string utils',function(){

  describe('test diff',function(){

    const diffStrings = [
      'foo\nbar\nbla',
      'foo\nfoo\nbla'
    ]

    it('diffs',()=>{

      return stringUtils.diff(...diffStrings).toPromise().then ( console.log )

    })

  })

})