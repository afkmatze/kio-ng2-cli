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
    console.log('targetPath',target)

    return env(target)
      .flatMap ( store => {
        return Observable.from(store.get('components'))
          .flatMap ( (component:NamedComponent) => {
            const targetPath = api.modules.resolve.rootPath()
            if ( project.namedComponentExists(component) )
            {
              return Observable.empty()
            }
            if ( project.isNamedFragmentComponentStructure(component) )
            {
              const data = project.dataForNamedFragmentComponent(component)
              return project.writeComponent(data,targetPath).map ( res => component )
            }
            else
            {
              const data = project.dataForNamedComponent(component)
              return project.writeComponent(data,targetPath).map ( res => component )
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
