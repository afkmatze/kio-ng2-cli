import 'mocha'
import * as env from './env/constants'
import * as path from 'path'
import expect, { assertExists } from './assert';
import assertFs from './assert/fs';


import * as Cache from './project/cache'

import projectModule from './project'


describe('project api',()=>{
 let project
  before(()=>{
    project = projectModule(env)
  })

  describe('env',()=>{

    describe(`KIO_PROJECT_ROOT "${env.KIO_PROJECT_ROOT}"`,()=>{

      it('is valid path',()=>{
        assertFs(env.KIO_PROJECT_ROOT).toBeADirectory()
      })

      it('has a package.json',()=>{
        assertFs(path.join(env.KIO_PROJECT_ROOT,'package.json')).toBeAFile()
      })

    })

  })

  describe('cache',()=>{

    describe(`test cache at "${env.KIO_PROJECT_CACHE}"`,()=>{

      it('is valid path',()=>{
        assertFs(env.KIO_PROJECT_CACHE).toBeADirectory()
      })

      it('has component path',()=>{
        assertFs(path.join(env.KIO_PROJECT_CACHE,'components')).toBeADirectory()
      })

      it('lists component files',(done)=>{
        project.cache.list().subscribe ( file => {
          console.log('publication component',file)
        }, done, done )
      })

      it('reads files',(done)=>{
        project.cache.list()
            .flatMap ( 
              filename => project.cache.readFile ( filename ) 
            )
            .toArray()
            .toPromise()
            .then ( items => {
              console.log('%s items', items.length )
              done()
            } )
            .catch ( done )
      })

    })

  })

  describe('init',function(){

    this.timeout(10000)
 
    it('exists',()=>{ expect(project).toExist() })
    
    it('has env',()=>{ expect(env).toExist() })
    
    it('has files',()=>{ expect(project).toContainKey('files') })

    it('emits files',(done)=>{ 
      project.files.list('src').subscribe( file => {
        //console.log('file',file)
      },done,done)
    })

    it('emits publication components',(done)=>{
      project.files.publicationComponents().subscribe ( file => {
        console.log('publication component',file)
      }, done, done )
    })

    it('emits publication component files',(done)=>{
      project.files.publicationComponentFiles().subscribe ( files => {
        console.log('publication component files',files)
      }, done, done )
    })

  })

})