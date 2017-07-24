import { KioNodeType } from 'kio-ng2'
import { QueryableAnnotation } from 'kio-ng2-component-routing'

export const Criteria : QueryableAnnotation = {
  type: '<%= contentType %>' ,
  modifiers: [<% JSON.stringify(modifiers,null,'  ') %> ] ,
  childTypes: [<% childTypes ? JSON.stringify(childTypes,null,'  ') : 'undefined' %> ] 
}
