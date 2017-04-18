import { TemplateName } from './interfaces'
import * as env from '../env'

/** path */

export const resolveTargetWithName = ( name:TemplateName ) => {
  switch (name) {
    case "index":
      return env.KIO_PATHS.root
    
    default:
      return env.path.join(env.KIO_PATHS.components.publication,name)
  }
}