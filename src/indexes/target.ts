import { IndexName } from './interfaces'
import { path, KIO_PATHS } from '../env'

export const targetPathForIndex = ( indexName:IndexName ):string => {
  if ( indexName === "publication" )
  {
    return path.join(KIO_PATHS.components.publication)
  }
  if ( indexName === "navigation" )
  {
    return path.join(KIO_PATHS.components.navigation)
  }
  if ( indexName === "structure" )
  {
    return path.join(KIO_PATHS.components.structure)
  }
  return KIO_PATHS.root
}