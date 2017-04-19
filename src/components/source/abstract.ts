import { ComponentSource, SourceFolder } from './interfaces'
import { ComponentModel, PublicationComponent } from '../classes'

import * as logger from '../../console'

import { Observable } from 'rxjs'

export abstract class AbstractComponentSource implements ComponentSource {

  static SourcePaths = ['publication','structure','navigation']

  abstract exists(name?:string):boolean;
  abstract prepare():Observable<string>;
  abstract fetch():Observable<ComponentModel>;
  isWritable:boolean=false;

  abstract normalizeName(componentName:string):string;
  

  // returns list with normalized component paths
  abstract scan(pathname:string):Observable<string>

  // return absolute path to source directory
  abstract sourcePathForName (pathname:string):string;
  
  compareTo(otherSource:AbstractComponentSource):Observable<SourceFolder> {
    
    return Observable.from ( AbstractComponentSource.SourcePaths ).flatMap ( sourcePath => {
      return Observable.forkJoin(this.readPath(sourcePath),otherSource.readPath(sourcePath)).map ( ([ownFolder,otherFolder],idx) => {
        //console.log({ownFolder,otherFolder})
        return {
          name: sourcePath,
          items: otherFolder.items.filter ( item => ownFolder.items.indexOf ( item ) === -1 )
        }
      } )
    } ).concat()/*.map ( result => {
      logger.log('%s items missing in %s', result.items.length, result.name )
      return result
    } )*/

  }

  readPath ( pathname:string ):Observable<SourceFolder> {
    return this.scan ( pathname ).toArray().map ( items => ({
      name: pathname,
      items
    }) )
  }

  abstract readComponentAtPath ( filepath:string ):Observable<ComponentModel>

}