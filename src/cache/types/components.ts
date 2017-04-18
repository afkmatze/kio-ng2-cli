import { Observable, Scheduler } from 'rxjs'
import * as path from 'path'
import * as rxfs from '../../utils/rx/fs'
import * as fs from 'fs'
import * as env from '../../env'
import { echo, find, cat } from 'shelljs'
import { ensure, resolve } from '../store'
import * as logger from '../../console'
import { findComponents, createWithData, Component, PublicationComponent } from '../../components'

const componentTypeNames = ['publication','structure','navigation']

const writeToFile = (filename:string,data:any) => new Promise((resolve,reject)=>{
  fs.writeFile(filename,data,'utf8',(error)=>{
    error ? reject(error) : resolve()
  })
})

const cacheComponent = ( component:Component|PublicationComponent, targetDir:string ) => {
  const data = component.toJSON()
  const targetPath = path.join(targetDir,component.name+'.json')
  logger.debug('write component %s to "%s"', component , targetPath )
  return writeToFile(targetPath,JSON.stringify(data,null,'\t')).then ( () => targetPath )
}

const cacheComponents = ( targetDir:string, typeName ) => Promise.all(
    findComponents(typeName).map( component => cacheComponent ( component , targetDir ) )
  )

const isJSON = ( filename:string ) => /\.json$/i.test(filename)

export const readCache = ( targetDir:string ) => {
  const pathname = !path.isAbsolute(targetDir) ? resolve(targetDir) : targetDir
  return find(pathname)
          .filter(isJSON)
          .map(filename => cat(filename))
          .map (json => JSON.parse(json))
}

export const createComponentsCache = ( targetDir:string ):Promise<any[]> => {
  return Promise.all(
      componentTypeNames.map ( 
          componentType => cacheComponents(ensure("components",componentType),componentType)
        )
    ).then ( results => {
      return results.reduce((prev,cur)=>prev.concat(cur))
    } )
}

export const readComponentsCache = ( targetDir:string ) => {
  return readCache(targetDir)
        .map ( (data:any) => createWithData(data) )
}

const readJSON = (filepath:string):Observable<any> => {
  return Observable.fromPromise(new Promise((resolve,reject)=>{
    fs.readFile(filepath,'utf8',(error,result)=>{
      error ? reject(error) : resolve(result)
    })    
  }).then(JSON.parse),Scheduler.async)
}


export const Components = () => rxfs.readdir(path.join(env.KIO_PROJECT_CACHE,'components'))
                                .filter(filename=>path.extname(filename)==='.json')
                                .flatMap(filename => readJSON(filename),1).concat().map(data=>createWithData(data))

export default createComponentsCache