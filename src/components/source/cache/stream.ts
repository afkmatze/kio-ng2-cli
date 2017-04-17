import { Observable, Scheduler } from 'rxjs'
import { ComponentSource, PublicationComponent, Component, ComponentModel } from '../interfaces'
import { KioComponent, KioPublicationComponent, KioStructureComponent, KioComponentType, ComponentType } from '../../interfaces'
import { createWithData } from '../../create'


import { path, KIO_PROJECT_CACHE, KIO_PROJECT_ROOT, KIO_PATHS } from '../../../env'
import { readdir, readfile } from '../../../utils/rx/fs'
import * as rxfs from '../../../utils/rx/fs'


const logMap = (value,idx)=>{
   console.log('value %s',idx,value)
   return value
 }

const KioComponentType2Path = {
  [KioComponentType.PublicationComponent]: 'publication',
  [KioComponentType[KioComponentType.PublicationComponent]]: 'publication',
  [KioComponentType.NavigationComponent]: 'navigation',
  [KioComponentType[KioComponentType.NavigationComponent]]: 'navigation',
  [KioComponentType.StructureComponent]: 'structure',
  [KioComponentType[KioComponentType.StructureComponent]]: 'structure'
}

const COMPONENTS_CACHE = path.join(KIO_PROJECT_CACHE, 'components')

const resolveComponentsCache = ( componentType:KioComponentType|string, ...args:string[] ) => {
  return path.join(COMPONENTS_CACHE, KioComponentType2Path[componentType],...args)
}

export const fetch = () => readdir(path.join(KIO_PROJECT_CACHE,'components'))
           .filter(item => path.extname(item) === '.json' )
           .flatMap( filename => readfile(filename,true).map(value => JSON.parse(value)) )


export class CacheStream implements ComponentSource {

  isWritable=true

  exists(name:string="components"){
    return rxfs.existsSync(path.join(KIO_PROJECT_CACHE,name))
  }
  
  fetch():Observable<ComponentModel> {
    return fetch()
        .map ( createWithData )
        .flatMap ( component => Observable.of(component,Scheduler.async) )
        .concat()
  }
  
  prepare():Observable<string> {
    return Observable.of('')
  }


  write(component:PublicationComponent):Observable<string>{
    const cacheDir = resolveComponentsCache(component.typeName)
    const cachePath = resolveComponentsCache(component.typeName, component.name+'.json')
    const jsonData = component.toJSON()
    const data = JSON.stringify(jsonData,null,'  ')

    const exists = rxfs.existsSync(cacheDir)
    let source = Observable.of(cachePath)
    if ( !exists )
    {
      source = Observable.fromPromise(rxfs.async.mkdir(cacheDir,true).then ( () => cachePath ))
    }
    return source.flatMap(filepath => rxfs.writeFile( cachePath, data ) )
  }
}

export default new CacheStream()