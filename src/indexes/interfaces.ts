import { ComponentModel, PublicationComponent, Component } from '../components'

export type IndexName = "publication"|"structure"|"navigation"|"fixture"|"criteria"

export enum IndexType {
  publication,
  structure,
  navigation,
  fixture,
  criteria,
}

export interface ComponentIndex {
  name:IndexName;
  components:ComponentModel[];  
}