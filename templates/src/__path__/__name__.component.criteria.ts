import { KioNodeType } from 'kio-ng2'
import { QueryableAnnotation } from 'kio-ng2-component-routing'

export const Criteria : QueryableAnnotation <KioNodeType.<%= contentType %>>  = {
  type: KioNodeType.<%= contentType %> ,
  modifiers: [<% for(var i=0; i<modifiers.length; i++) {%><%= i > 0 ? "," : "" %>'<%= modifiers[i] %>'<% } %> ] 
}
