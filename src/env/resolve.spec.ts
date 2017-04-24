import 'mocha'
import expect, { assert } from 'ceylon';
import assertFs from '../assert/fs';
import * as resolveModule from './resolve'

describe('resolve env',function(){

  it('isInstalled returns false',function(){
    expect(resolveModule.isInstalled()).toBeFalse()

  })

  it('moduleRoot',function(){
    const root = resolveModule.moduleRoot()
    assertFs(root).toBeADirectory()
  })

  it('package info path',function(){
    const packagePath = resolveModule.resolveProjectPackagePath()
    assertFs(packagePath).toBeAFile()
  })

  it('resolveProjectPackage',()=>{
    const packageInfo = resolveModule.resolveProjectPackage()
    expect(packageInfo).toContainKeys(['name','version','kio'])
  })

})