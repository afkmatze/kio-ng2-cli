import { KioNodeType } from 'kio-ng2'
import { QueryableFragmentAnnotation } from 'kio-ng2-component-routing'

export const Criteria : QueryableFragmentAnnotation = {
  type: KioNodeType.<%= contentType %> ,
  modifiers: [<% for(var i=0; i<modifiers.length; i++) {%><%= i > 0 ? "," : "" %>'<%= modifiers[i] %>'<% } %> ] ,
  childTypes: [<% for(var i=0; i<childTypes.length; i++) {%><%= i > 0 ? "," : "" %>'<%= childTypes[i] %>'<% } %> ] 
}
