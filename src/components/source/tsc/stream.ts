import { Observable, Scheduler } from 'rxjs'
import { ComponentSource, PublicationComponent, Component, ComponentModel } from '../interfaces'
import { AbstractComponentSource } from '../abstract'
import { KioComponent, KioPublicationComponent, KioStructureComponent, KioComponentType, ComponentType } from '../../interfaces'
import { createWithData, createWithPath, getComponentTypeForPath } from '../../create'

import { path, KIO_PROJECT_CACHE, KIO_PROJECT_ROOT, KIO_PATHS } from '../../../env'
import { readdir, readfile, readstats, findFiles, find, exec, evalJS } from '../../../utils/rx/fs'
import { dasherize } from '../../../utils/string'
import * as logger from '../../../console'


const MAX_AGE = 120 * 1000


const logMap = (value,idx)=>{
   console.log('value %s',idx,value)
   return value
 }

 const logMapLabel = ( label:string ) => (value,idx)=>{
   console.log('%s #%s', label, idx)
   console.log('---\n',value,'\n---')
   return value
 }

export const fetch = () => readdir(path.join(KIO_PROJECT_CACHE,'components'))
           .filter(item => path.extname(item) === '.json' )
           .flatMap( filename => readfile(filename,true).map(value => JSON.parse(value)) )


const TSC_OUT = path.join(KIO_PROJECT_CACHE,'tsc-out')

export class TSCStream extends AbstractComponentSource {

  isWritable=false

  sourcePathForName ( pathname:string ) {
    return KIO_PATHS.components[pathname]
  }

  exists(){
    return true
  }
  

  normalizeName ( componentName:string ):string {
    return componentName.replace('.'+path.extname(componentName),'')
  }

  // date of last compilation
  protected getLastCompilation():Observable<number>{
    return Observable.fromPromise(findFiles(TSC_OUT,/\.js$/).take(1).toPromise()
      .then(
        (firstFile:string) => readstats(firstFile).toPromise()
      )
      .then ( stat => stat.mtime.getTime() )
      .catch( (error) => {
        //console.log('error on last compilation', error )
        return 0
      } )
    )
  }
  protected lastCompiled:Observable<number>

  protected shouldRefresh(){
    return this.getLastCompilation().map(ts => !ts || (Date.now()-ts > MAX_AGE && MAX_AGE > 0) )
  }

  protected isCompiling:boolean=false
  private compiles:Observable<boolean>

  protected compile():Observable<boolean>{
    if ( this.compiles )
      return this.compiles
    logger.log('recompile')
    const obs = exec(`tsc --outDir "${path.relative(KIO_PROJECT_ROOT,TSC_OUT)}"`,{
      cwd: KIO_PROJECT_ROOT
    }).map(item => item.stdout.toString('utf8') ) 
    .flatMap(error => {
      logger.logError(`${error}`,false)
      return Observable.fromPromise(Promise.reject(error))
    })

    obs.toArray().map ( () => {
      logger.log('compiled to "%s"', TSC_OUT )
      this.lastCompiled = Observable.of(Date.now())
      this.compiles = null
    } )

    this.compiles = obs
    return obs
  }

  protected evalComponentFile (component:ComponentModel,filename:string) {
    const relpath = path.relative(KIO_PROJECT_ROOT,filename)  
    const targetPath = path.join(TSC_OUT,relpath).replace(/\.ts$/,'.js')
    return evalJS(targetPath)
  }

  scan(pathname:string):Observable<string> {
    const targetPath:string = KIO_PATHS.components[pathname]
    return findFiles(targetPath)
      .map ( file => path.relative(targetPath,file).replace(/\.json$/,'') ) 
      .catch ( error => {
        console.error(error)
        return Observable.of([])
      } )
      .map ( (file:string) => path.dirname(file) )
      .filter(f => f && !/^\./.test(f) ) // no empty
      .filter((f:string) => !f.startsWith('index') )
      .distinct()
  }

  protected findComponentDirs(){
    return Observable.from(Object.keys(KIO_PATHS.components).map (key=>KIO_PATHS.components[key]))
          .flatMap(filepath => {
            return findFiles(filepath,/\.component\.*/).map ( filename => path.dirname(filename) )
          })
          .distinct()
          //.map ( logMapLabel('merged') )
  }
  

  readComponentAtPath ( filepath:string ):Observable<ComponentModel> {
    const componentName = path.basename(filepath)
    return this.readComponent(path.join(KIO_PATHS.root,filepath))
  }

  protected readComponent(componentPath:string):Observable<ComponentModel>{
    return this.prepare().flatMap ( () => {
      logger.log('componentPath %s',componentPath)
      return Observable.of(createWithPath(componentPath))
              .flatMap( (component:ComponentModel) => {
                const criteriaFile = component.getFile('criteria')
                if ( criteriaFile )
                {
                  const pubComponent:PublicationComponent = <PublicationComponent>component
                  return this.evalComponentFile(component,criteriaFile)
                      .map( criteriaModule => {
                        pubComponent.modifiers = criteriaModule.Criteria.modifiers
                        pubComponent.childTypes = criteriaModule.Criteria.childTypes
                        return pubComponent
                      } )
                }
                return Observable.of(component)
              } )
    })
  }

  prepare():Observable<boolean>{
    return this.getLastCompilation()
        .map ( ts => Date.now() - ts )
        //.map ( logMapLabel('last compilation') )
        .flatMap( d => d > MAX_AGE ? this.compile() : Observable.of(false) )
  }

  fetch():Observable<ComponentModel> {
    return this.prepare()
          .flatMap ( () => this.findComponentDirs() )
          .flatMap(filepath => this.readComponent(filepath))
  }
}

export default new TSCStream()