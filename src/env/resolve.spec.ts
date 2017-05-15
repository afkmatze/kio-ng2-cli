import 'mocha'
import expect, { assert } from 'ceylon';
import assertFs from '../assert/fs';
import * as resolveModule from './resolve'
import { api as kioEnvApi, env, EnvStore } from 'kio-ng2-env'

describe('resolve env',function(){

  it('isInstalled returns false',function(){
    expect(resolveModule.isInstalled()).toBeFalse()

  })

  it('has env',()=>{
    return kioEnvApi.modules.resolve.kioModules().toArray().toPromise().then ( modules => {
      expect(modules).toExist()
    } )
  })

  it('has env project',()=>{
    return env().toPromise().then ( store => {
      expect(store).toExist()
      expect(store).toBeA(EnvStore)
      expect(store.get('components')).toBeA(Array)
    } )
  })

  it('moduleRoot',function(){
    const root = resolveModule.moduleRoot()
    console.log('moduleRoot:',root)
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