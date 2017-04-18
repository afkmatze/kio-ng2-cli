import {TemplateFile, PublicationTemplate, IndexTemplate } from './interfaces'
import { Observable, Scheduler } from 'rxjs'
import { ComponentModel } from '../components/classes'


export const withTemplate = ( template:PublicationTemplate|IndexTemplate ) => {

  const writeComponentStream = ( componentStream:Observable<ComponentModel> ) => {

    let sub = null

    const handleComponent = ( component:ComponentModel ) => {

    }
    const handleError = ( error:any ) => {

    }
    const onDone = () => {
      sub.unsubscribe()
    }

    sub = componentStream.subscribe(handleComponent,handleError,onDone)

    
  }

}