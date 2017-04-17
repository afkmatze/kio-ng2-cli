import { Observable, Scheduler } from 'rxjs'
import { ComponentSource, PublicationComponent, Component, ComponentModel } from '../interfaces'
import { KioComponent, KioPublicationComponent, KioStructureComponent, KioComponentType, ComponentType } from '../../interfaces'
import { createWithData, createWithPath, getComponentTypeForPath } from '../../create'

import { path, KIO_PROJECT_CACHE, KIO_PROJECT_ROOT, KIO_PATHS } from '../../../env'
import { readdir, readfile, readstats, findFiles, exec, evalJS } from '../../../utils/rx/fs'
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

export class TSCStream implements ComponentSource {

  isWritable=false

  exists(){
    return true
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
  private compiles:Observable<string>

  protected compile():Observable<string>{
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

    obs.toPromise().then ( () => {
      logger.log('compiled to "%s"', TSC_OUT )
      this.lastCompiled = Observable.of(Date.now())
      this.compiles = null
    } )

    this.compiles = obs
    return Observable.concat(obs,this.findComponentDirs())
  }

  protected evalComponentFile (component:ComponentModel,filename:string) {
    const relpath = path.relative(KIO_PROJECT_ROOT,filename)  
    const targetPath = path.join(TSC_OUT,relpath).replace(/\.ts$/,'.js')
    return evalJS(targetPath)
  }


  protected findComponentDirs(){
    return Observable.from(Object.keys(KIO_PATHS.components).map (key=>KIO_PATHS.components[key]))
          .flatMap(filepath => {
            return findFiles(filepath,/\.component\.*/).map ( filename => path.dirname(filename) )
          })
          .distinct()
          //.map ( logMapLabel('merged') )
  }

  protected readComponent(componentPath:string):Observable<ComponentModel>{
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
  }

  prepare():Observable<string>{
    return this.getLastCompilation()
        .map ( ts => Date.now() - ts )
        //.map ( logMapLabel('last compilation') )
        .flatMap( d => d > MAX_AGE ? this.compile() : this.findComponentDirs() )
  }



  fetch():Observable<ComponentModel> {
    return this.prepare().flatMap(filepath => this.readComponent(filepath))
  }
}

export default new TSCStream()