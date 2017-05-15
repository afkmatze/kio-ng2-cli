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
        assertFs(path.join(env.resolveRoot('package.json'))).toBeAFile()
      })

      it('can read package.json',()=>{
        expect(env.resolveProjectPackage()).toExist()
      })

      it('package.json has kio key',()=>{
        expect(env.resolveProjectPackage()).toContainKey("kio")
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
      project.files.publicationComponents().toArray().subscribe ( files => {
        expect(files).toExist('No publication component files found.')
        expect(files.length).toBeGreaterThan(0)
        files.forEach ( (file:string) => {
          expect(file).toNotMatch(/\.DS_Store/,'.DS_Store files should be ignored')
        } )
        //console.log('publication components',files)
      }, done, done )
    })

   /* it('emits structure components',(done)=>{
      project.files.structureComponents().toArray().subscribe ( files => {
        expect(files).toExist()
        expect(files.length).toBeGreaterThan(0)
        files.forEach ( (file:string) => {
          expect(file).toNotMatch(/\.DS_Store/,'.DS_Store files should be ignored')
        } )
      }, done, done )
    })

    it('emits navigation components',(done)=>{
      project.files.navigationComponents().toArray().subscribe ( files => {
        expect(files).toExist()
        expect(files.length).toBeGreaterThan(0)
        files.forEach ( (file:string) => {
          expect(file).toNotMatch(/\.DS_Store/,'.DS_Store files should be ignored')
        } )
      }, done, done )
    })*/

    it('emits publication component files',(done)=>{
      project.files.publicationComponentFiles().subscribe ( fileGroup => {
        expect(fileGroup).toExist('No publication component files found.')
        expect(fileGroup.length).toBeGreaterThan(0)
        fileGroup.forEach ( (file:string) => {
          expect(file).toNotMatch(/\.DS_Store/,'.DS_Store files should be ignored')
        } )
      }, done, done )
    })

    it('emits publication component fixtures',(done)=>{
      project.files.publicationComponentFixtures().toArray().subscribe ( files => {
        expect(files).toExist('No publication component files found.')
        expect(files.length).toBeGreaterThan(0)
        console.log('%s files', files.length, files.map ( f => path.basename(f) ))
        files.forEach ( (file:string) => {
          expect(file).toNotMatch(/\.DS_Store/,'.DS_Store files should be ignored')
        } )
      }, done, done )
    })

  })

})