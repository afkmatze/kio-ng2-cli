import 'mocha'
import expect, { assert } from 'ceylon';
import assertFs from './assert/fs';

import * as env from './env'
import * as rxfs from './utils/rx/fs'
import * as project from './project'
import { ProjectEnv, Project } from './project/interfaces'

process.env.KIO_NG2_PROJECT = env.path.resolve(__dirname,'../test_target')

/*export const assertRendering = ( componentFilePath:string ) => {

}
*/
export const assertEnv = (env:ProjectEnv) => {

  describe('test project env',function(){

    describe('test path names',()=>{

      it(`has value for MACHINE_ROOT (${env.MACHINE_ROOT})`,()=>expect(env).toContainKey('MACHINE_ROOT'))
      it(`has valid path for MACHINE_ROOT`,()=>assertFs(env.MACHINE_ROOT).toBeADirectory())
      it(`has value for KIO_PROJECT_ROOT (${env.KIO_PROJECT_ROOT})`,()=>expect(env).toContainKey('KIO_PROJECT_ROOT'))
      it(`has valid path for KIO_PROJECT_ROOT`,()=>assertFs(env.KIO_PROJECT_ROOT).toBeADirectory())
      //it(`has value for KIO_PROJECT_CACHE (${env.KIO_PROJECT_CACHE})`,()=>expect(env).toContainKey('KIO_PROJECT_CACHE'))
      //it(`has valid path for KIO_PROJECT_CACHE`,()=>assertFs(env.KIO_PROJECT_CACHE).toBeADirectory())
      it(`has value for KIO_PATHS (${env.KIO_PATHS})`,()=>expect(env).toContainKey('KIO_PATHS'))
      it(`has valid path for KIO_PATHS`,()=>expect(env.KIO_PATHS).toContainKeys(['root','components']))
      it(`has value for KIO_TEMPLATES (${env.KIO_TEMPLATES})`,()=>expect(env).toContainKey('KIO_TEMPLATES'))
      it(`has valid path for KIO_TEMPLATES`,()=>assertFs(env.KIO_TEMPLATES).toBeADirectory())

    })

    describe('test resolving',()=>{

      it('resolves root path', ()=>{

        expect(env.resolve('.')).toEqual(env.KIO_PROJECT_ROOT)

      })
    })


  })

}

assertEnv(env)

describe('test project initialization',function(){

/*  it('no cache exists at ' + process.env.KIO_NG2_PROJECT+'/.kio-ng2-cache', function(){
    assertFs(env.resolveProjectCache()).toNotBeADirectory()
  })*/
  describe('init',function(){

    this.timeout(10000)

    it('exists',()=>{ expect(project).toExist() })

    it('has files',()=>{ expect(project).toContainKey('files') })

    it('emits files',(done)=>{ 
      project.files.list('src').subscribe( file => {
        //console.log('file',file)
      },done,done)
    })

    it('emits publication components',(done)=>{
      project.files.publicationComponents().toArray().subscribe ( files => {
        //console.log('publication component',files)
      }, done, done )
    })

    it('emits publication component files',(done)=>{
      project.files.publicationComponentFiles().subscribe ( files => {
        //console.log('publication component files',files)
      }, done, done )
    })

  })

  describe('template rendering',function(){

    describe('indexes',()=>{

      it('project templates',()=>{
        expect(project).toContainKey('templates')
      })
      
      it('project templates indexes',()=>{
        expect(project.templates).toContainKey('indexes')
      })
      
      it('project templates indexes.mapFileToTemplateDataItem exists',()=>{
        expect(project.templates.indexes).toContainKey('mapFileToTemplateDataItem')
      })
      
      it('project templates indexes.mapFileToTemplateDataItem is a function',()=>{
        expect(project.templates.indexes.mapFileToTemplateDataItem).toBeA('function')
      })

      describe('rendering',function(){

        describe('maps structure component',()=>{

          let structureComponent
          before(()=>{
            return project.files.structureComponents().take(1).toPromise()
                .then ( item => env.resolveRoot(item) )
                .then ( componentFile => structureComponent = project.templates.indexes.mapFileToTemplateDataItem(componentFile,env.KIO_PATHS.root) )
            
          })

          it('has props importName, importPath',()=>{
            expect(structureComponent).toContainKeys(['importName','importPath'])
          })
          
          it('importPath is valid',()=>{
            assertFs(env.path.resolve(env.KIO_PATHS.root,structureComponent.importPath+'.ts')).toBeAFile()
            expect(<string>structureComponent.importPath).toNotContain('./..')
          })

        })

        describe('maps navigation component',()=>{

          let navigationComponent
          before(()=>{
            return project.files.navigationComponents().take(1).toPromise()
                .then ( item => env.resolveRoot(item) )
                .then ( componentFile => navigationComponent = project.templates.indexes.mapFileToTemplateDataItem(componentFile,env.KIO_PATHS.root) )
            
          })

          it('has props importName, importPath',()=>{
            expect(navigationComponent).toContainKeys(['importName','importPath'])
          })
          
          it('importPath is valid',()=>{
            assertFs(env.path.resolve(env.KIO_PATHS.root,navigationComponent.importPath+'.ts')).toBeAFile()
            expect(<string>navigationComponent.importPath).toNotContain('./..')
          })

        })

        describe('maps publication component',()=>{

          let publicationComponent
          before(()=>{
            return project.files.publicationComponents().take(1).toPromise()
                .then ( item => env.resolveRoot(item) )
                .then ( componentFile => publicationComponent = project.templates.indexes.mapFileToTemplateDataItem(componentFile,env.KIO_PATHS.root) )
            
          })

          it('has props importName, importPath',()=>{
            expect(publicationComponent).toContainKeys(['importName','importPath'])
          })
          
          it('importPath is valid',()=>{
            assertFs(env.path.resolve(env.KIO_PATHS.root,publicationComponent.importPath+'.ts')).toBeAFile()
            expect(<string>publicationComponent.importPath).toNotContain('./..')
          })

        })

        describe('maps publication fixture',()=>{

          let publicationComponentFixture
          before(()=>{
            return project.files.publicationComponentFixtures().take(1).toPromise()
                .then ( item => env.resolveRoot(item) )
                .then ( componentFixtureFile => publicationComponentFixture = project.templates.indexes.mapFileToTemplateDataItem(componentFixtureFile,env.KIO_PATHS.root) )
            
          })

          it('has props importName, importPath, importAlias',()=>{
            expect(publicationComponentFixture).toContainKeys(['importName','importPath','importAlias'])
          })
          
          it('importPath is valid',()=>{
            assertFs(env.path.resolve(env.KIO_PATHS.root,publicationComponentFixture.importPath+'.ts')).toBeAFile()
            expect(<string>publicationComponentFixture.importPath).toNotContain('./..')
          })

        })

        describe('maps publication criteria',()=>{

          let publicationComponentCriteria
          before(()=>{
            return project.files.publicationComponentCriterias().take(1).toPromise()
                .then ( item => env.resolveRoot(item) )
                .then ( componentCriteriaFile => publicationComponentCriteria = project.templates.indexes.mapFileToTemplateDataItem(componentCriteriaFile,env.KIO_PATHS.root) )
            
          })

          it('has props importName, importPath, importAlias',()=>{
            expect(publicationComponentCriteria).toContainKeys(['importName','importPath','importAlias'])
          })
          
          it('importPath is valid',()=>{
            assertFs(env.path.resolve(env.KIO_PATHS.root,publicationComponentCriteria.importPath+'.ts')).toBeAFile()
            expect(<string>publicationComponentCriteria.importPath).toNotContain('./..')
          })

        })


        describe('rendering files',()=> {

          describe('structure',()=>{

            it('renders',()=>{
              return project.templates.indexes.mapFilesToTemplateData('StructureComponents',project.files.structureComponents(),env.KIO_PATHS.root)
                      .flatMap ( templateData => project.templates.indexes.render('StructureComponents',templateData) )
                      .toPromise()
                        .then ( result => {
                          expect(result).toBeA('string')
                        } )
            })

          })

          describe('navigation',()=>{

            it('renders',()=>{
              return project.templates.indexes.mapFilesToTemplateData('NavigationComponents',project.files.navigationComponents(),env.KIO_PATHS.root)
                      .flatMap ( templateData => project.templates.indexes.render('NavigationComponents',templateData) )
                      .toPromise()
                        .then ( result => {
                          expect(result).toBeA('string')
                        } )
            })

          })

          describe('publication',()=>{

            it('renders',()=>{
              return project.templates.indexes.mapFilesToTemplateData('PublicationComponents',project.files.publicationComponents(),env.KIO_PATHS.root)
                      .flatMap ( templateData => project.templates.indexes.render('PublicationComponents',templateData) )
                      .toPromise()
                        .then ( result => {
                          expect(result).toBeA('string')
                        } )
            })

          })

          describe('publication criteria',()=>{

            it('renders',()=>{
              return project.templates.indexes.mapFilesToTemplateData('PublicationCriterias',project.files.publicationComponentCriterias(),env.KIO_PATHS.root)
                      .flatMap ( templateData => project.templates.indexes.render('PublicationCriterias',templateData) )
                      .toPromise()
                        .then ( result => {
                          expect(result).toBeA('string')
                        } )
            })

          })

          describe('publication fixture',()=>{

            it('renders',()=>{
              return project.templates.indexes.mapFilesToTemplateData('PublicationFixtures',project.files.publicationComponentFixtures(),env.KIO_PATHS.root)
                      .flatMap ( templateData => project.templates.indexes.render('PublicationFixtures',templateData) )
                      .toPromise()
                        .then ( result => {
                          expect(result).toBeA('string')
                        } )
            })

          })

        })

      })

    })



  })

  describe('commands',()=>{

    describe('buildIndexes',()=>{

      it('executes',()=>{

        return project.buildIndexes()
          .toPromise()

      })

    })

    before(()=>{
      return rxfs.exec(`rm -rf "./publication/fragment/test-container"`,{cwd: env.KIO_PATHS.root}).toPromise()
    })

    describe('createComponent',()=>{

      it('executes',()=>{

        return project.createComponent({
          name: 'TestContainer',
          contentType: 'fragment',
          childTypes: ['src','src','txt','txt'],
          modifiers: ['test','container']          
        })
          .toPromise()

      })

    })

  })


})