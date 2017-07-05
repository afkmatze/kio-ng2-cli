import { Observable } from 'rxjs'
import { Project, ProjectEnv } from './interfaces'
import { api } from 'kio-ng2-env'
import { cliRoot } from '../env'
import * as rxshell from 'rxshell'
import * as path from 'path'
import { dasherize } from '../utils/string'
import * as logger from '../console'

export const createProject = ( opts:{name:string} ) => {
  const projectPath = path.join(process.cwd(),dasherize(opts.name))
  const createScript = path.join(cliRoot(),'scripts/setup_digit.sh') 
  logger.log ( '%s "%s"', createScript, projectPath )
  const command:rxshell.CommandParams = {
    commandName: createScript,
    args: [projectPath]
  }
  return rxshell.exec({command,cwd: process.cwd()}).map ( s => {
    if ( s.stderr )
    {
      return `\x1b[31mError: ${s.stderr}\x1b[0m`
    }
    return `${s.stdout}`
  } )
}