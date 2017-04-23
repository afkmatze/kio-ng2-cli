import 'mocha'
import * as env from './env/constants'
import * as path from 'path'
import expect, { assertExists } from './assert';
import assertFs from './assert/fs';
import * as project from './project'


describe('project api',()=>{
 
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
        //console.log('publication component',file)
      }, done, done )
    })

    it('emits publication component files',(done)=>{
      project.files.publicationComponentFiles().subscribe ( files => {
        //console.log('publication component files',files)
      }, done, done )
    })

  })

})