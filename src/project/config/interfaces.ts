import { NamedComponent, NamedComponentStructure, NamedFragmentComponentStructure } from 'kio-ng2-data'

export interface ConfigFile {
  components: NamedComponent[]
}

export interface ProjectConfig extends ConfigFile {
  configFilepath?:string
}

