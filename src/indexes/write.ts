import { IndexName, IndexType, ComponentIndex } from './interfaces'
import { getFiles, readFile, TemplateFile, TemplateFiles } from '../template'

export const writeIndex = ( componentIndex:ComponentIndex ) => {
  return getFiles(componentIndex.name)
}