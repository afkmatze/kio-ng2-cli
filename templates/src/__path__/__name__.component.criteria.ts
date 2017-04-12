import { QueryableAnnotation } from 'kio-ng2-component-routing'

export const Criteria : QueryableAnnotation = {
  type: '<%= contentType %>' ,
  modifiers: [<% for(var i=0; i<modifiers.length; i++) {%><%= i > 0 ? "," : "" %>'<%= modifiers[i] %>'<% } %> ] 
}
