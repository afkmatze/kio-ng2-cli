import { KioNodeType } from 'kio-ng2-data'
import { QueryableAnnotation } from 'kio-ng2-component-routing'

export const Criteria : QueryableAnnotation = {
  type: '<%= contentType %>' ,
  modifiers: <%- JSON.stringify(modifiers) %> 
}
