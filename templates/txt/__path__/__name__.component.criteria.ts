import { QueryableAnnotation } from 'kio-ng2-component-routing'

export const Criteria : QueryableAnnotation = {
  type: '<%= contentType %>' ,
  modifiers: [<% modifiers.forEach(function(modifier){ %>
    '<%= modifier %>'
  <% });%>] ,
  childTypes: [<% childTypes.forEach(function(childType){ %>
    '<%= childType %>'
  <% });%>]
}
