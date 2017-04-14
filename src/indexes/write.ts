import { IndexName, IndexType, ComponentIndex } from './interfaces'
import { getFiles, readFile } from '../template/read'

export const writeIndex = ( componentIndex:ComponentIndex ) => {
  return getFiles(componentIndex.name)
}