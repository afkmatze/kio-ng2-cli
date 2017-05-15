import * as yargs from 'yargs'
import * as project from '../project'
import { env, api } from 'kio-ng2-env'
import * as logger from '../console'
import { NamedComponent } from 'kio-ng2-component-routing'

import { Observable } from 'rxjs'


export const updateProjectCommand = ():yargs.CommandModule => ({
  command: 'updateProject',
  aliases: ['update'],
  describe: 'Updates a new kio digitorial project',
  builder: ( argv ) => {
    return argv
      .usage('Usage: $0 <command> [options]')
      .options({
        target: {
          type: 'string',
          default: process.env.KIO_NG2_PROJECT || process.cwd(),
          describe: 'Project root'
        }
      })
      
  },  
  handler: (args:any) => {
    const [ command, projectName ] = args._ 

    const {
      target
    } = args

    return env(target)
      .flatMap ( store => {
        console.log('store components',store.get('components'))
        return Observable.from(store.get('components'))
          .flatMap ( (component:NamedComponent) => {
            if ( project.namedComponentExists(component) )
            {
              logger.log('Component "%s" already exists at %s', component.name, project.pathForNamedComponent(component.type,component.name))
              return Observable.empty()
            }else if ( project.isNamedFragmentComponentStructure(component) )
            {
              logger.log('Write FragmentComponent "%s" at %s', component.name, project.pathForNamedComponent(component.type,component.name))
              const data = project.dataForNamedFragmentComponent(component)
              return project.writeComponent(data,target).map ( res => component )
            }
            else
            {
              logger.log('Write Component "%s" at %s', component.name, project.pathForNamedComponent(component.type,component.name))
              const data = project.dataForNamedComponent(component)
              return project.writeComponent(data,target).map ( res => component )
            }
          } )
          .map ( (component:NamedComponent) => {
            logger.log('Wrote "%s"', component.name )
            return component
          } )
          .toArray()
          .flatMap ( components => {
            return store.save().map ( () => store )    
          } )
        

      } )
      .toPromise()
      .then( envStore => {
        console.log('envStore',envStore.get('components'))
      })
      .catch ( error => {
        console.error(error)
      } )
  }
})
